import React, { memo, useEffect, useState } from 'react'
import { ModalMask } from '../../compotents/'
import loding from './loding.module.css'
import LodingItem from './LodingItem'
const Loding = props => {
    let [i, setI] = useState(0);
    if ( i < 2) {
        setTimeout(() => {
            setI(i + 1)
        }, 3000);
    }
    
    return (
        <div className={`xfs-modal-show ${props.isShow === 'loding' ? ' d-block' : ' d-none'}`}>
            {console.log('渲染')}
            <ModalMask changePull={props.changePull}>
                <div className={loding.xfsLoding}>
                    <h1>执行步骤</h1>
                    <div className={loding.xfsLodingStep}>
                        <LodingItem order={i} />
                        {/* <LodingItem order={1}/>
                        <LodingItem order={2}/> */}
                    </div>
                </div>
            </ModalMask>

        </div>
    )
}

export default memo(Loding)