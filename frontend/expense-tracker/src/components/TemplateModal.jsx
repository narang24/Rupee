import React, { useRef, } from 'react'
import { FiDownload, FiUploadCloud } from "react-icons/fi";
import Template from './Templates/Template';
import { useReactToPrint } from 'react-to-print';

const TemplateModal = ({ type, closeModal, templateData }) => {

    const contentRef  = useRef();

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        documentTitle: `${type}`,
    });

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/50'>
            <div className='w-[85vw] md:w-[25vw] bg-white px-3 pt-3 rounded-3xl shadow-md shadow-gray-700/50'>
            <div className='px-2.5 py-1.5 flex justify-between items-center'>
                <p className='font-semibold text-[15px] md:text-[16px] text-[#02457A]'>Your {type}</p>
                <div className='flex justify-center items-center gap-3'>
                    <button className='text-[12px] text-white font-semibold px-2.5 md:px-3 py-1.5 bg-[#02457A] rounded-md flex justify-center items-center gap-1 md:gap-2 cursor-pointer' onClick={() => handlePrint()}><FiDownload />Download</button>
                    <button className='text-[13px] font-semibold bg-[#02457A]/10 text-[#02457A] hover:bg-[#02457A] hover:text-white rounded-md px-2.5 md:px-3 py-1.5 cursor-pointer' onClick={closeModal}>Close</button>
                </div>
            </div>

            <div ref={contentRef}>
                <Template type={type} templateData={templateData}/>
            </div>

            </div>
        </div>
    )
}

export default TemplateModal
