import React from 'react';
import './BookingCard.css';

const BookingCard = ({ booking, onCancel }) => {
    const isFlight = booking.itemType === 'Flight';
    const icon = isFlight ? '✈️' : '🏨';
    const statusColor = booking.status === 'Confirmed' ? 'confirmed' : 'cancelled';

    // Defensive check
    const item = booking.itemId || {};

    return (
        <div className="booking-card">
            <div className="booking-info">
                <p className="booking-type">
                    {icon} {booking.itemType} Booking
                </p>

                <h3 className="booking-title">
                    {isFlight ? item.airline || 'Unknown Flight' : item.name || 'Unknown Hotel'}
                </h3>

                {isFlight ? (
                    <div className="booking-details">
                        <p>
                            From <strong>{item.source}</strong> to <strong>{item.destination}</strong>
                        </p>
                        <p className="booking-date">
                            Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'} |{' '}
                            {item.duration || '—'}
                        </p>
                    </div>
                ) : (
                    <div className="booking-details">
                        <p>City: <strong>{item.city || 'N/A'}</strong></p>
                        <p>Rating: ⭐ {item.rating ? item.rating.toFixed(1) : 'N/A'}</p>
                        <p className="booking-date">
                            Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                        {item.images?.length > 0 && (
                            <img
                                src={`http://localhost:5000${item.images[0]}`}
                                alt={item.name}
                                className="booking-hotel-image"
                            />
                        )}
                    </div>
                )}
            </div>

            <div className="booking-actions">
                <span className={`status ${statusColor}`}>
                    {booking.status}
                </span>

                <p className="booking-price">
                    ₹{booking.totalAmount.toLocaleString()}
                </p>

                {booking.status === 'Confirmed' && (
                    <button
                        onClick={() => onCancel(booking._id)}
                        className="cancel-button"
                    >
                        Cancel Booking
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookingCard;
