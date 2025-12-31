import { CheckCircle, Calendar, MapPin, Download, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingConfirmation() {
  const [showConfetti, setShowConfetti] = useState(true);
  const onNavigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-violet-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#14b8a6', '#8b5cf6', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">
              Booking Confirmed!
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Get ready for an amazing experience at your space
          </p>

          <div className="bg-gradient-to-br from-teal-50 to-violet-50 rounded-2xl p-6 mb-8">
            <div className="flex gap-4 mb-6">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Property"
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Modern Loft Studio</h3>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  Downtown LA
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Nov 15, 2025 • 10:00 AM - 2:00 PM
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Total Paid</span>
              <span className="text-2xl font-bold text-teal-600">$330.00</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-left">
              <div className="font-semibold text-blue-900 mb-1">Confirmation sent!</div>
              <div className="text-sm text-blue-700">
                Check your email for booking details and host contact information.
              </div>
            </div>

            <button className="w-full py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('/customer/dashboard')}
              className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-violet-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go to Dashboard
            </button>
            <button
              onClick={() => onNavigate('/property')}
              className="flex-1 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Browse More
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
