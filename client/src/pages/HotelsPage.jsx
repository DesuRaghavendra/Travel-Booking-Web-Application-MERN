//with actual database connectivity
import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './HotelPage.css';

const HotelsPage = () => {
    const { isAuthenticated } = useAuth();
    const [hotels, setHotels] = useState([]);
    const [city, setCity] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const navigate = useNavigate();

    const fetchHotels = async () => {
        setLoading(true);
        setMessage('');
        setSearchClicked(true);

        try {
            const params = {};
            if (city) params.city = city;
            if (minPrice) params.minPrice = minPrice;
            if (maxPrice) params.maxPrice = maxPrice;
            if (minRating) params.minRating = minRating;

            const { data } = await api.get('/hotels', { params });
            if (data.length === 0) {
                setMessage('No hotels found for the given filters.');
            }
            setHotels(data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
            setMessage('Error loading hotels. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!city.trim() && !minPrice && !maxPrice && !minRating) {
            setMessage('Please enter at least one filter to search.');
            return;
        }
        fetchHotels();
    };

    const handleBook = async (hotelId, price) => {
        if (!isAuthenticated) {
            alert('Please login to book a hotel.');
            navigate("/auth");
            return;
        }

        try {
            await api.post('/bookings', {
                itemType: 'Hotel',
                itemId: hotelId,
                totalAmount: price,
            });

            alert('✅ Hotel booked successfully!');
            setMessage('Hotel successfully booked! Check My Bookings.');
            setTimeout(() => setMessage(''), 5000);
        } catch (error) {
            console.error('Booking failed:', error);
            setMessage('Booking failed. Please try again.');
        }
    };

    return (
        <div className="hotels-container">
            <h1 className="page-title">🏨 Find Your Perfect Stay</h1>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="City (e.g., Mumbai)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="search-input"
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="search-input"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="search-input"
                />
                <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="search-input"
                >
                    <option value="">Min Rating</option>
                    <option value="1">⭐ 1+</option>
                    <option value="2">⭐ 2+</option>
                    <option value="3">⭐ 3+</option>
                    <option value="4">⭐ 4+</option>
                    <option value="5">⭐ 5</option>
                </select>
                <button type="submit" className="search-button">
                    Search Hotels
                </button>
            </form>

            {!searchClicked ? null : loading ? (
                <div className="loading">Loading hotels...</div>
            ) : message ? (
                <div className="message">{message}</div>
            ) : (
                <div className="hotel-cards">
                    {hotels.map((hotel) => (
                        <div key={hotel._id} className="hotel-card">
                            <img
                                src={
                                    hotel.images?.[0]
                                    ? `http://localhost:5000${hotel.images[0]}`
                                    : 'https://via.placeholder.com/600x400.png?text=Hotel'
                                }
                            alt={hotel.name}
                            className="hotel-image"
                            />

                            <div className="hotel-info">
                                <h3 className="hotel-name">{hotel.name}</h3>
                                <p className="hotel-city">{hotel.city}</p>
                                <p className="hotel-rating">⭐ {hotel.rating?.toFixed(1) || 'N/A'}</p>
                                <p className="hotel-price">₹{hotel.price.toLocaleString()} / night</p>
                                {hotel.description && (
                                    <p className="hotel-description">{hotel.description}</p>
                                )}
                                <button
                                    onClick={() => handleBook(hotel._id, hotel.price)}
                                    className="book-button"
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

export default HotelsPage;


/*
{
  "name": "Delhi Sultan Palace",
  "city": "Delhi",
  "price": 13000,
  "rating": 4.2,
  "description": "Majestic luxury blending heritage and modern amenities.",
  "images": ["/uploads/hotel5.jpg"]
}

{
  "name": "Delhi Grand Royale",
  "city": "Delhi",
  "price": 15000,
  "rating": 4.5,
  "description": "A sophisticated blend of elegance and modernity, offering an unparalleled stay.",
  "images": ["/uploads/hotel9.jpg"]
}


*/