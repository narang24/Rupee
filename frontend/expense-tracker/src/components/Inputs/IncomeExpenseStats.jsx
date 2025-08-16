import React, { useState } from "react";
import { useStatsData } from "../../utils/data";
import { MdCurrencyRupee } from "react-icons/md";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import SmallBarChart from "../Charts/SmallBarChart";

const IncomeExpenseStats = ({ type }) => {
  const { data } = useStatsData();
  const {
    totalIncome,
    totalExpense,
    oneMonthTotalIncome,
    oneMonthTotalExpense,
    sixMonthsTotalExpense,
    sixMonthsTotalIncome,
    categoryIncomeAgg,
    categoryExpenseAgg,
  } = data;
  const percent =
    type === "Income"
      ? Math.round(
          totalIncome === oneMonthTotalIncome
            ? 0
            : (oneMonthTotalIncome / (totalIncome - oneMonthTotalIncome)) * 100,
          2
        )
      : Math.round(
          totalExpense === oneMonthTotalExpense
            ? 0
            : (oneMonthTotalExpense / (totalExpense - oneMonthTotalExpense)) *
                100,
          2
        );
  const barData = [
    { name: "Income", value: oneMonthTotalIncome },
    { name: "Expense", value: oneMonthTotalExpense },
  ];

  return (
    <div className="mb-2 md:mb-0 flex-1 bg-transparent rounded-xl grid grid-cols-2 gap-3.5">
      <div className="relative -z-10 flex flex-col gap-3.5">
        <div className=" relative h-6/10 bg-white rounded-xl shadow-md hover:shadow-lg shadow-gray-300 py-1.5 md:py-3 px-3 flex flex-col">
          <h3 className="h-1/3 text-lg md:text-xl text-[#02457A] flex flex-col">
            Statistics <span className="text-xs text-[#02457A]">one Month</span>
          </h3>
          <SmallBarChart data={barData} />
        </div>

        <div className="relative h-4/10 bg-white rounded-xl shadow-md hover:shadow-lg shadow-gray-300">
          {/* ui box */}
          <div className="h-1/4 w-full absolute top-0 bg-transparent border-b-2 border-[#02457A]/70 flex items-center px-1 py-2">
            <RiMoneyRupeeCircleLine className="text-[#02457A]/60 text-xl" />
          </div>
          <div className="h-full flex justify-between items-end px-3 py-2">
            <div className="">
              <p className="text-[#02457A] font-semibold text-sm md:text-[16px]">
                Last Six Months
              </p>
              <p className="text-xs md:text-sm text-[#02457A]">{type}</p>
            </div>
            <p className="text-2xl md:text-3xl text-[#02457A] font-light">
              &#x20B9;
              {type === "Income" ? sixMonthsTotalIncome : sixMonthsTotalExpense}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="h-70/100 bg-white rounded-xl shadow-md hover:shadow-lg shadow-gray-300">
          <div className="h-4/10 rounded-xl m-2 mb-0.5 bg-[#018ABE]/40 flex justify-between items-end px-3 py-2">
            <div className="flex flex-col text-xs md:text-sm text-[#018ABE]">
              {type}{" "}
              <div className="flex items-center font-light text-xl md:text-3xl text-[#02457A]">
                &#x20B9;
                {type === "Income" ? data.totalIncome : data.totalExpense}
              </div>
            </div>
            <div className="w-fit px-1 py-0.5 rounded-xl border-[2px] border-white/50">
              {percent > 0 ? (
                <p className="flex justify-center items-center gap-0.5 md:gap-1 text-xs text-[#02457A]">
                  <IoIosTrendingUp />+{percent}%
                </p>
              ) : (
                <p className="flex justify-center items-center gap-0.5 md:gap-1 text-xs text-[#02457A]">
                  <IoIosTrendingDown />
                  {percent}%
                </p>
              )}
            </div>
          </div>

          <div className="h-55/100 overflow-y-scroll scrollbar-custom">
            {(type === "Income" ? categoryIncomeAgg : categoryExpenseAgg) &&
              (type === "Income" ? categoryIncomeAgg : categoryExpenseAgg).map(
                (item, index) => (
                  <div
                    className="flex justify-between items-end px-2 md:px-3 py-2 border-b-2 border-[#02457A]/5 hover:bg-[#02457A]/10"
                    key={index}
                  >
                    <div className="flex gap-0.5 md:gap-1 items-center">
                      <RiMoneyRupeeCircleLine className="text-[#018ABE]" />
                      <p className="text-[#02457A] text-sm md:text-[15px]">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-[#018ABE] text-[13px] md:text-sm">
                      &#x20B9;{item.total}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>

        <div className="relative -z-10 h-30/100 bg-[#02457A]/90 rounded-xl shadow-md hover:shadow-lg shadow-gray-300">
          <div className="flex justify-between px-3 py-2">
            <div className="">
              <p className="text-white/90 text-[13px] md:text-[16px]">
                Last Month
              </p>
              <p className="text-xs md:text-sm text-white/50">{type}</p>
            </div>
            <p className="text-xl md:text-2xl text-white font-light">
              &#x20B9;
              {type === "Income" ? oneMonthTotalIncome : oneMonthTotalExpense}
            </p>
          </div>
          {/* ui box */}
          <div className="h-1/5 w-full absolute bottom-0 bg-transparent border-t-2 border-white/40"></div>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseStats;
