import React from "react";
import "../style/FamilyMember.css";
import { useState } from "react";
import { getMember } from "../endpoints/api";
import { useDispatch } from "react-redux";
import { sagaActions } from "../features/family/actions/actions";
import ModalMember from "./ModalMember";
const FamilyMember = ({ member, relations, push }) => {
    const [hover, setHover] = useState(false)
    const [usedIds, setUsedIds] = useState([]);
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch();

    const loadChildren = () => {
        relations.forEach((relative) => {
            if (!usedIds.includes(relative.member.id) && (relative.relationType === "Son" || relative.relationType === "Daughter")) {
                getMember(relative.member.id).then(
                    (res) => {
                        push(prevState => [...prevState, res])
                        setUsedIds(prevState => [...prevState, relative.member.id])
                    })
            }
        })
    }
    const onHoverInfo = relations
    .filter(relative => (relative.relationType === "Wife"
    || relative.relationType === "Husband"));

    return (
        <>
            {!!modal && <ModalMember close={setModal} member={member} relations={relations}/>}
            <div className="member-container" 
            onClick={loadChildren}
            onMouseEnter={
                () => {
                    setHover(true)
            }}
            onMouseLeave={
                () => {
                    setHover(false)
                }
            }
                    >
                
                <div className="member-info">
                    <div className="buttons-member">
                        <div className="delete" onClick={(e) => {
                            e.stopPropagation();
                            dispatch({type: sagaActions.DELETE_USER, payload: member.id})
                        }}>Delete</div>
                        <div className="update" onClick={(e) => {
                            e.stopPropagation();
                            setModal(true)
                        }}>Update</div>
                    </div>
                    <div className="member-info-title">Member Info:</div>
                    <div className="member-name member-info-row">{`Name: ${member.first_name} ${member.last_name}`}</div>
                    <div className="member-age member-info-row">Age: {member.age}</div>
                    <div className="member-gender member-info-row">Gender: {member.gender}</div>
                </div>
                {!!onHoverInfo.length && hover && <div className="member-relations">
                        {onHoverInfo.map((relative) => {
                            return (
                                <>
                                    <div className="relation-type member-info-row">{relative.relationType}</div>
                                    <div className="member-name member-info-row">Name: {`${relative.member.first_name} ${member.last_name}`}</div>
                                    <div className="member-age member-info-row">Age: {relative.member.age}</div>
                                    <div className="member-gender member-info-row">Gender: {relative.member.gender}</div>
                                </>
                            )
                        })}
                </div>}
            </div>
        </>
    )
}

export default FamilyMember;