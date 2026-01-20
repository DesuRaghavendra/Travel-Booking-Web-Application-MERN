import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FlightPage.css';

const FlightsPage = () => {
    const { isAuthenticated } = useAuth();
    const [flights, setFlights] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const navigate = useNavigate();

    const fetchFlights = async () => {
        setLoading(true);
        setMessage('');
        setSearchClicked(true);
        try {
            const params = {};
            if (source) params.source = source;
            if (destination) params.destination = destination;
            if (date) params.date = date;

            const { data } = await api.get('/flights', { params });

            if (data.length === 0) {
                setMessage('No flights found for the selected route and date.');
            }
            setFlights(data);
        } catch (error) {
            console.error('Error fetching flights:', error);
            setMessage('Error loading flights. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFlights();
    };

    const handleBook = async (flightId, price) => {
        if (!isAuthenticated) {
            alert('Please login to book a flight.');
            navigate("/auth");
            return;   
        }

        try {
            const response = await api.post('/bookings', {
                itemId: flightId,
                itemType: 'Flight'
            });

            if (response.status === 201) {
                alert(`✅ Flight booked successfully for ₹${price.toLocaleString()}`);
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error booking flight:', error);
            alert('Error booking flight. Please try again later.');
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="homepage-container">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">✈️ Book Your Flight</h1>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Source City"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="text"
                    placeholder="Destination City"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input-field"
                    required
                />
                <button type="submit" className="btn-primary">
                    Search Flights
                </button>
            </form>

            {!searchClicked ? null : loading ? (
                <div className="loading">Loading flights...</div>
            ) : message ? (
                <div className="message">{message}</div>
            ) : (
                <div className="flight-results">
                    {flights.map((flight) => (
                        <div key={flight._id} className="flight-card">
                            <div className="flight-info">
                                <h3 className="flight-airline">{flight.airline}</h3>

                                <p className="flight-date">
                                    {new Date(flight.date).toLocaleDateString()} | 🕒{' '}
                                    {formatTime(flight.date)}
                                </p>

                                <p className="flight-route">
                                    {flight.source} → {flight.destination}
                                </p>

                                {flight.duration && (
                                    <p className="flight-duration">⏱ Duration: {flight.duration}</p>
                                )}
                            </div>

                            <div className="price-section">
                                <p className="flight-price">₹{flight.price.toLocaleString()}</p>
                                <button
                                    onClick={() => handleBook(flight._id, flight.price)}
                                    className="btn-primary"
                                >
                                    {isAuthenticated ? 'Book Now' : 'Login to Book'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FlightsPage;
