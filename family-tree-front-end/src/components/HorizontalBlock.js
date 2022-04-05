import React, { useState, useEffect } from "react"
import FamilyMember from "./FamilyMember";
const HorizontalBlock = ({family, member, relations}) => {
    
    const [displayedData, setDisplayedData] = useState([{member, relations}])
    useEffect(() => {
        console.log(family.value)
    }, [family.value])
    return (<div className="member-column">
        {displayedData
        .map(
            (data, i) => <FamilyMember key={i} member={data.member} relations={data.relations} push={setDisplayedData}/>
        )}
        </div>)

}

export default HorizontalBlock;




