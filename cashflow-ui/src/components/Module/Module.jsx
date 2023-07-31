import React, { useState } from 'react';
import QuizPreview from './QuizPreview';
import ModuleInfo from './ModuleInfo';
import modulesInfo from '../../../../cashflow-api/modules/modulesInfo.json';




export default function Module({setInfoPage, infoPage, module_name, cashBotLink}) {
    
    const module_data = modulesInfo[`${module_name}`]
    const num_pages = module_data.sections.length
    return (
        <>
        {
            (infoPage === num_pages) ? 
            <QuizPreview module_name={module_name}/>
            :
            <ModuleInfo cashBotLink={cashBotLink} module_data={module_data} num_pages={num_pages} setInfoPage={setInfoPage} infoPage={infoPage} />
        }
        </>
    )
}