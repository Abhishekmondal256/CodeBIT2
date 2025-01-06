import React, { useEffect, useState } from "react";
import useInstance from "../hooks/useIntance";
export const RegTimer = ({ deadline, compName }) => {
    const [hasCreatedInstance, setHasCreatedInstance] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const { instanceCreate } = useInstance();

    // create a contest insatnce 30 min before the contest

    const getTime = (deadline) => {
        const time = Date.parse(deadline) - Date.now();
        const remainingDays = Math.floor(time / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const remainingMinutes = Math.floor((time / (1000 * 60)) % 60);
        const remainingSeconds = Math.floor((time / 1000) % 60);

        setDays(remainingDays);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
        if (
            !hasCreatedInstance &&
            remainingDays === 0 &&
            remainingHours === 0 &&
            remainingMinutes === 5 &&
            remainingSeconds === 0 &&
            compName === "contest"
        ) {
            console.log("horha");
            instanceCreate();
            setHasCreatedInstance(true);
            console.log("hogya");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
        return () => clearInterval(interval);
    }, [deadline]); // Include compName as a dependency

    return (
        <div className="text-[15px] text-[#0DB256]">
            {(days < 1 && days >= 0) ? (
                <div className="flex">
                    <p>{hours.toString().padStart(2, '0')}:</p>
                    <p>{minutes.toString().padStart(2, '0')}:</p>
                    <p>{seconds.toString().padStart(2, '0')}</p>
                </div>
            ) : ((days < 5 && days > 0) ? (
                <div className="flex justify-center items-center ">
                    <p>{days}d</p>
                    <p>{hours.toString().padStart(2, '0')}h</p>
                    <p>{minutes.toString().padStart(2, '0')}m</p>
                    <p>{seconds.toString().padStart(2, '0')}s</p>
                </div>
            ) : ((days > 0) ? (
                <div>{days}days</div>
            ) : (
                <div></div>
            )
            ))}
        </div>
    );
};
