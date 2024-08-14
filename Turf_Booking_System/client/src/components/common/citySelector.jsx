import React from 'react';
import { cities } from '../../data/cities';

// const cities = [
//     { name: "Ahmedabad", icon: "🏰" },
//     { name: "Bengaluru", icon: "🏰" },
//     { name: "Chennai", icon: "🏰" },
//     { name: "Delhi-NCR", icon: "🏰" },
//     { name: "Hyderabad", icon: "🏰" },
//     { name: "Kolkata", icon: "🏰" },
//     { name: "Mumbai", icon: "🏰" },
//     { name: "Pune", icon: "🏰" },
// ];

const moreCities = [
    "Aalo", "Abohar", "Abu Dhabi", "Abu Road", "Achampet", 
    "Acharapakkam", "Adilabad", "Adimali"
];

const CitySelector = () => {
    return (
        <div className="p-4">
            <h1 className="text-lg font-semibold mb-2">Select your city</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search for your city"
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div>
                <h2 className="text-md font-medium mb-2">Popular cities</h2>
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-4">
                    {cities.map((city) => (
                        <div
                            key={city.name}
                            className="flex flex-col items-center p-1 border rounded-md cursor-pointer hover:bg-gray-100"
                        >
                            <div className="text-xl"><img src={city.image} alt="" /></div>
                            <div className="text-center text-sm mt-2">{city.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-md font-medium mb-2">More cities</h2>
                <div className="divide-y divide-gray-200">
                    {moreCities.map((city) => (
                        <div
                            key={city}
                            className="py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                        >
                            <span>{city}</span>
                            <span className="text-xl">&gt;</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitySelector;