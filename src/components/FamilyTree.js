import React, { useEffect, useState } from "react";
import "../style/index.css"
import HorizontalBlock from "./HorizontalBlock";
import { useDispatch, useSelector } from 'react-redux';
import { sagaActions } from '../features/family/actions/actions';
import ModalMember from "./ModalMember";



const FamilyTree = () => {
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch();
    const family = useSelector(
        (state) => {
            return state.family
        }
    )
    useEffect(()=> {
        dispatch({type: sagaActions.FETCH_FAMILY_DATA})
    }, [dispatch]);
    console.log(family.value)

    return (
        <>
            {!!modal && <ModalMember close={setModal}/>}
            <div className="main-container">
            {!modal &&<div className="create-member" onClick={()=>setModal(true)}>Create</div>}
                {!!family?.value?.members && family.value.members
                .filter((data) => {
                    return !data.relations.find(relative => {
                        return (
                            relative.relationType === "Father" ||
                            relative.relationType === "Mother" ||
                            relative.relationType === "Husband"
                            )
                    })
                })
                .map(
                    (data, i) => <HorizontalBlock key={i} family={family} member={data.member} relations={data.relations}/>
                )}
            </div>
        </>
    )
}

export default FamilyTree