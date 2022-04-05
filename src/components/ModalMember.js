import "../style/ModalMember.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react" ;
import { useDispatch } from "react-redux";
import { sagaActions } from '../features/family/actions/actions';
const ModalMember = ({member, relations, close}) => {
    const dispatch = useDispatch();
    const [showRelatives, setShowRelatives] = useState(false)
    const family = useSelector(
        (state) => {
            return state.family
        }
    )
    const relatives = family.value.members.map((member) => {
        return {id: member.member.id, full_name: `${member.member.first_name} ${member.member.last_name}`}
    })
    const [relativesArray, setRelativesArray] = useState([]);
    useEffect(() => {
        if (relations) {
            setRelativesArray(relations.map(relation=> {
                return {
                    id: relation.member.id,
                    full_name: `${relation.member.first_name} ${relation.member.last_name}`,
                    relation_id: relation.id
                    }
                }
            )
        )
    }}, [relations])
    const submit = () => {
        const gender = document.getElementById("select-gender").value;
        const first_name = document.getElementById("first-name").value;
        const last_name = document.getElementById("last-name").value;
        const age = parseInt(document.getElementById("age").value);
        const relationsArray = relations ? {new: [], delete: []} : [];
        relativesArray.map((el) => {

            const relationType = document.getElementsByClassName(`relation-type-${el.id}`)[0].value;
            const parentship = relationType === "Parent" || relationType === "Child";
            if (relations) {
                if (!relations.find(relation => relation.id === el.relation_id)) {
                    relationsArray.new.push({
                        id: el.id,
                        relation: parentship ? "parentship": "marriage",
                        reverse: parentship ? relationType === "Child": false
                    })
                }
                return;
            }
            relationsArray.push({
                id: el.id,
                relation: parentship ? "parentship": "marriage",
                reverse: parentship ? relationType === "Child": false
            })
        });
        if (relations) {
            const deleteArray = [];
            relations.forEach((relation) => {
                if (!(relativesArray.find((el) => 
                relation.id === el.relation_id
            )))  deleteArray.push(relation.id)
            })
            relationsArray.delete = deleteArray
        }
        const body = {
            first_name,
            last_name,
            age,
            gender,
            relations: relationsArray
        }
        !member?.id ?
            dispatch({type: sagaActions.CREATE_USER, payload: body}) :
            dispatch({type: sagaActions.UPDATE_USER, payload: {
                ...body,
                id: member.id
            }})
        close(false);
    }

    const RelativesOptions = () => {
        
        return (
            <> 
            <div
                className="select-header"
                onClick={
                    () => {
                        setShowRelatives(prev => !prev)
                        }}>{showRelatives ? "Hide Relatives": "Add Relatives"}
            </div> 
            { showRelatives && !!relatives && <div id="select-relatives">
                {
                    relatives.map((el, i) => {
                        return (<div key={i} onClick={() => {
                            !relativesArray.find(relative => relative.id === el.id) ? 
                            setRelativesArray(prev => [
                            ...prev,
                            {
                                id: el.id,
                                full_name: el.full_name
                            }
                        ]) :
                        setRelativesArray(prev => prev.filter(relative => relative.id !== el.id))
                    }} 
                            className={relativesArray.find((rel) => rel.id === el.id ) ? "option option-relative selected": " option option-relative" }
                            value={el.id}>{el.full_name}</div>)
                    })
                }
                </div>
            }
                </>
        )
    }

    const RelationType = ({ full_name, id }) => {
        let relationType;
        const relationById = relations.find(relative => relative.member.id === id);
        if (relations && relationById) {
            relationType = relationById.relationType
            if (relationType === "Son" || relationType === "Daughter") {
                relationType = "Child"
            } else if (relationType === "Father" || relationType === "Mother") {
                relationType = "Parent"
            } else {
                relationType = "Husband/Wife"
            }
        }
        return (
            <div>
                <div>{`Relation type for ${full_name}`}</div>
                <select id="select-relatives-type" defaultValue={
                    relations && relationType ?
                        relationType: 
                        "Parent"
                } className={`relation-type-${id}`}>
                    <option className="option">Parent</option>
                    <option className="option">Child</option>
                    <option className="option">Husband/Wife</option>
                </select>
            </div>
        )
    }
    return (
        <div className="overlay">
            <div className="modal-main">
                <div className="modal-header">{member?.id ? "Change Member": "Create Member"}</div>
                <div className="inputs">
                    <input id="first-name" defaultValue={member ? member.first_name: ""} className="input" placeholder="First Name"/>
                    <input id="last-name" defaultValue={member ? member.last_name: ""} className="input" placeholder="Last Name"/>
                    <input id="age" defaultValue={member ? member.age: ""} className="input" placeholder="Age"/>
                    <select name="gender"  defaultValue={member ? member.gender: "Male"} className="input" id="select-gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <RelativesOptions/>
                    {!!relativesArray.length && 
                    relativesArray.map((relative) => 
                    <RelationType full_name={relative.full_name} id={relative.id}/>
                    )}
                </div>
                <div className="buttons">
                        <div className="button close" onClick={()=>close(false)}>Close</div>
                        <div className="button submit" onClick={submit}>Submit</div>
                </div>
            </div>
        </div>
    )
}

export default ModalMember;



