const Switch = ({ isOn, handleToggle }) => {
    return (
        <div
            className={`w-14 my-2 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isOn ? "bg-green-400" : "bg-gray-300"
                }`}
            onClick={handleToggle}
        >
            <div
                className={`bg-white w-6 h-3 rounded-full shadow-md transform ${isOn ? "translate-x-6" : "translate-x-0"
                    } transition-transform duration-300 ease-in-out`}
            />
        </div>
    );
};

export default Switch;