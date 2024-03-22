'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';


interface TouristCenter {
    _id: string;
    label: string;
    icon: React.ElementType;
    image: string;
    description: string;
}

function mainPage() {
    const [touristCenters, setTouristCenters] = useState<TouristCenter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchTouristCenters();
    }, []);

    const fetchTouristCenters = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get<TouristCenter[]>('https://dark-blue-dibbler-toga.cyclic.app/touristCenters');
            setTouristCenters(response.data);
        } catch (error) {
            console.error('Error fetching tourist centers:', error);
            setError('Failed to fetch tourist centers.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-800">Loading...</div>
      </div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="sm:mx-32 mx-4 justify-center my-6">
            <h1 className="text-3xl text-gray-600 text-center font-bold mb-8">Calabar Tourist Centers</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {touristCenters.map((center) => (
                    <div key={center._id} className="bg-white rounded-lg border p-4 flex flex-col justify-between">
                        <div>
                            <img src={center.image} alt={center.label} className="w-full h-48 object-cover mb-4 rounded-t-lg" />
                            <div className="flex items-center mb-2">
                               
                                <h2 className="text-lg font-semibold">{center.label}</h2>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{center.description.slice(0, 120)}...</p>
                        </div>
                        <Link href={`/alllistings/${center.label}`} className="bg-green-500 text-white py-2 w-[40%] rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-start px-4">
                            Visit Center <span className="ml-2">&rarr;</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default mainPage;
