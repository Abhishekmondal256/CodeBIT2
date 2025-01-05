import React, { useState, useEffect } from "react";
import useInstance from "../hooks/useIntance"

export const RegTimer = ({ deadline, compName }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const {instanceCreate} = useInstance();

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
        // Check for the exact 30-minute mark
        if (remainingDays === 0 && remainingHours === 0 && remainingMinutes === 10 && remainingSeconds === 0 && compName === "contest") {
            console.log("horha");
            instanceCreate();
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


export const RunningTimer = ({ compName }) => {
    const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds

    const { instanceDelete } = useInstance();

    const getTime = () => {
        if (timeLeft <= 0 && compName === "contest") {
            instanceDelete();
        }

        setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    };

    useEffect(() => {
        const interval = setInterval(getTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="text-sm text-[#0DB256]">
            {(hours < 3 && hours >= 0) ? (
                <div className="flex">
                    <p>{hours.toString().padStart(2, '0')}h</p>
                    <p>{minutes.toString().padStart(2, '0')}m</p>
                    <p>{seconds.toString().padStart(2, '0')}s</p>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};