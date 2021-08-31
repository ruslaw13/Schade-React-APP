import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";

const AllEvents = () => {
    const [damageData, setDamageData] = useState({});
    const [roadData, setRoadData] = useState({});
    const { currentUser } = useAuth();

    useEffect(() => {
        db.ref("events/" + currentUser.uid).once("value", snapshot => {
            setDamageData({ ...snapshot.val() });
        });
        db.ref("roadEvents/" + currentUser.uid).once("value", snapshot => {
            setRoadData({ ...snapshot.val() });
        });
    }, [currentUser.uid]);
    return (
        <React.Fragment>
            <section className='section'>
                <div className='scroll'>
                    <h2 className="h2">Alle gemelde schades</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='table__header'>
                                    Plaats van het incident
                                </th>
                                <th className='table__header'>
                                    Kenteken
                                </th>
                                <th className='table__header'>Beschrijving</th>
                                <th className='table__header'>
                                    Prioriteit van schade
                                </th>
                                <th className='table__header'>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(damageData).map(item => {
                                return (
                                    <tr key={nanoid()}>
                                        <td className='table__data'>
                                            {damageData[item].place}
                                        </td>
                                        <td key={nanoid()} className='table__data'>
                                            {damageData[item].plateNumber}
                                        </td>
                                        <td key={nanoid()} className='table__data'>
                                            {damageData[item].damageDescription}
                                        </td>
                                        <td key={nanoid()} className='table__data'>
                                            {damageData[item].prioritaire}
                                        </td>
                                        <td key={nanoid()} className='table__data'>
                                            {damageData[item].status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='scroll'>
                    <h2 className="h2">Alle bekende incidenten</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='table__header'>
                                    Het type
                                </th>
                                <th className='table__header'>
                                    Plaats van het incident
                                </th>                                
                                <th className='table__header'>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(roadData).map(item => {
                                return (
                                    <tr key={nanoid()}>
                                        <td key={nanoid()} className='table__data'>
                                            {roadData[item].eventType}
                                        </td>                                        
                                        <td key={nanoid()} className='table__data'>
                                            {roadData[item].place}
                                        </td>
                                        <td key={nanoid()} className='table__data'>
                                            {roadData[item].status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
            <Navigation />
        </React.Fragment>
    );
};

export default AllEvents;
