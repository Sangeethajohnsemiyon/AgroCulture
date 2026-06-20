import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LangProvider } from './context/LangContext';
import ProtectedRoute from './components/ProtectedRoute';
import ChatbotWidget from './components/ChatbotWidget';

// Public Pages
const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const OtpVerificationPage = lazy(() => import('./pages/auth/OtpVerificationPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const FaqPage = lazy(() => import('./pages/public/FaqPage'));
const BlogListPage = lazy(() => import('./pages/public/BlogListPage'));
const BlogDetailPage = lazy(() => import('./pages/public/BlogDetailPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

// Marketplace (public)
const MarketplacePage = lazy(() => import('./pages/marketplace/MarketplacePage'));
const ProductDetailPage = lazy(() => import('./pages/marketplace/ProductDetailPage'));

// Farmer Pages
const FarmerDashboard = lazy(() => import('./pages/farmer/FarmerDashboard'));
const AddCropPage = lazy(() => import('./pages/farmer/AddCropPage'));
const CropMonitorPage = lazy(() => import('./pages/farmer/CropMonitorPage'));
const FarmGalleryPage = lazy(() => import('./pages/farmer/FarmGalleryPage'));
const FertilizerTrackerPage = lazy(() => import('./pages/farmer/FertilizerTrackerPage'));
const WaterUsagePage = lazy(() => import('./pages/farmer/WaterUsagePage'));
const HarvestSchedulePage = lazy(() => import('./pages/farmer/HarvestSchedulePage'));
const WeatherPage = lazy(() => import('./pages/shared/WeatherPage'));
const DiseaseDetectionPage = lazy(() => import('./pages/farmer/DiseaseDetectionPage'));
const CropRecommendationPage = lazy(() => import('./pages/farmer/CropRecommendationPage'));
const EquipmentRentalPage = lazy(() => import('./pages/farmer/EquipmentRentalPage'));

// Buyer Pages
const BuyerDashboard = lazy(() => import('./pages/buyer/BuyerDashboard'));
const CartPage = lazy(() => import('./pages/buyer/CartPage'));
const CheckoutPage = lazy(() => import('./pages/buyer/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('./pages/buyer/OrderHistoryPage'));
const DeliveryTrackingPage = lazy(() => import('./pages/buyer/DeliveryTrackingPage'));

// Shared Pages
const SalesAnalyticsPage = lazy(() => import('./pages/shared/SalesAnalyticsPage'));
const ProfitAnalysisPage = lazy(() => import('./pages/shared/ProfitAnalysisPage'));
const MarketPricePage = lazy(() => import('./pages/shared/MarketPricePage'));
const GovernmentSchemesPage = lazy(() => import('./pages/shared/GovernmentSchemesPage'));
const FeedbackPage = lazy(() => import('./pages/shared/FeedbackPage'));
const NotificationsPage = lazy(() => import('./pages/shared/NotificationsPage'));
const ProfileSettingsPage = lazy(() => import('./pages/shared/ProfileSettingsPage'));
const LiveChatPage = lazy(() => import('./pages/shared/LiveChatPage'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagementPage = lazy(() => import('./pages/admin/UserManagementPage'));
const ProductManagementPage = lazy(() => import('./pages/admin/ProductManagementPage'));
const OrderMonitoringPage = lazy(() => import('./pages/admin/OrderMonitoringPage'));
const ReportGenerationPage = lazy(() => import('./pages/admin/ReportGenerationPage'));
const SystemSettingsPage = lazy(() => import('./pages/admin/SystemSettingsPage'));

const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F1F8E9' }}>
    <div style={{ textAlign: 'center' }}>
      <div className="spinner" style={{ margin: '0 auto 1rem' }} />
      <p style={{ color: '#2E7D32', fontWeight: 600, fontFamily: 'Poppins' }}>🌱 Loading AgroConnect...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }, success: { iconTheme: { primary: '#2E7D32', secondary: 'white' } } }} />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-otp" element={<OtpVerificationPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/marketplace/product/:id" element={<ProductDetailPage />} />

                {/* Farmer Routes */}
                <Route path="/farmer/dashboard" element={<ProtectedRoute roles={['farmer']}><FarmerDashboard /></ProtectedRoute>} />
                <Route path="/farmer/add-crop" element={<ProtectedRoute roles={['farmer']}><AddCropPage /></ProtectedRoute>} />
                <Route path="/farmer/crop-monitor" element={<ProtectedRoute roles={['farmer']}><CropMonitorPage /></ProtectedRoute>} />
                <Route path="/farmer/gallery" element={<ProtectedRoute roles={['farmer']}><FarmGalleryPage /></ProtectedRoute>} />
                <Route path="/farmer/fertilizer" element={<ProtectedRoute roles={['farmer']}><FertilizerTrackerPage /></ProtectedRoute>} />
                <Route path="/farmer/water" element={<ProtectedRoute roles={['farmer']}><WaterUsagePage /></ProtectedRoute>} />
                <Route path="/farmer/harvest" element={<ProtectedRoute roles={['farmer']}><HarvestSchedulePage /></ProtectedRoute>} />
                <Route path="/farmer/disease-detection" element={<ProtectedRoute roles={['farmer']}><DiseaseDetectionPage /></ProtectedRoute>} />
                <Route path="/farmer/crop-recommendation" element={<ProtectedRoute roles={['farmer']}><CropRecommendationPage /></ProtectedRoute>} />
                <Route path="/farmer/equipment" element={<ProtectedRoute roles={['farmer']}><EquipmentRentalPage /></ProtectedRoute>} />

                {/* Buyer Routes */}
                <Route path="/buyer/dashboard" element={<ProtectedRoute roles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
                <Route path="/buyer/cart" element={<ProtectedRoute roles={['buyer', 'farmer']}><CartPage /></ProtectedRoute>} />
                <Route path="/buyer/checkout" element={<ProtectedRoute roles={['buyer', 'farmer']}><CheckoutPage /></ProtectedRoute>} />
                <Route path="/buyer/orders" element={<ProtectedRoute roles={['buyer']}><OrderHistoryPage /></ProtectedRoute>} />
                <Route path="/buyer/track/:id" element={<ProtectedRoute roles={['buyer']}><DeliveryTrackingPage /></ProtectedRoute>} />

                {/* Shared Auth Routes */}
                <Route path="/weather" element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
                <Route path="/analytics/sales" element={<ProtectedRoute><SalesAnalyticsPage /></ProtectedRoute>} />
                <Route path="/analytics/profit" element={<ProtectedRoute><ProfitAnalysisPage /></ProtectedRoute>} />
                <Route path="/analytics/market-prices" element={<ProtectedRoute><MarketPricePage /></ProtectedRoute>} />
                <Route path="/schemes" element={<GovernmentSchemesPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
                <Route path="/live-chat" element={<LiveChatPage />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><UserManagementPage /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute roles={['admin']}><ProductManagementPage /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute roles={['admin']}><OrderMonitoringPage /></ProtectedRoute>} />
                <Route path="/admin/reports" element={<ProtectedRoute roles={['admin']}><ReportGenerationPage /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute roles={['admin']}><SystemSettingsPage /></ProtectedRoute>} />

                {/* Redirects & 404 */}
                <Route path="/dashboard" element={<DashboardRedirect />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <ChatbotWidget />
          </CartProvider>
        </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  );
}

function DashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'farmer') return <Navigate to="/farmer/dashboard" />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" />;
  return <Navigate to="/buyer/dashboard" />;
}

export default App;
