import React from "react";

const AdminForgot = () => {
    React.useEffect(() => {
        document.body.style.backgroundColor = "black";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const h1Style = {
        color: "white",
        textAlign: "center",
        textShadow: "0 4px 7px blue",
        animation: "blast 2s ease-in-out forwards"
    };

    return (
        <>
            <h1 style={h1Style} className="h-screen flex justify-center items-center text-4xl orbitron tracking-widest">
                IF YOU KNOW THE <span className="text-cyan-400 px-2"> SCRECT TOKEN </span> YOU CAN REGISTER AGAIN
            </h1>
            
            <style>{`
                @keyframes blast {
                    0% { transform: scale(0); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </>
    );
};

export default AdminForgot;