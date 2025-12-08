import { useState } from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    storeName: 'Luxury Jewellery Store',
    email: 'admin@jewellery.com',
    phone: '+91 98765 43210',
    address: '123 Gold Street, Mumbai, Maharashtra 400001',
    currency: 'INR',
    taxRate: '3',
    shippingFee: '500',
    minOrderAmount: '10000',
    emailNotifications: true,
    smsNotifications: true,
    orderNotifications: true,
    lowStockAlert: true,
    lowStockThreshold: '5',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your store settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Information */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Store Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="input-field"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows={3}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                className="input-field"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Fee (₹)
              </label>
              <input
                type="number"
                name="shippingFee"
                value={settings.shippingFee}
                onChange={handleChange}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Amount (₹)
              </label>
              <input
                type="number"
                name="minOrderAmount"
                value={settings.minOrderAmount}
                onChange={handleChange}
                className="input-field"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="rounded text-gold-500 focus:ring-gold-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Email Notifications
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={settings.smsNotifications}
                onChange={handleChange}
                className="rounded text-gold-500 focus:ring-gold-500"
              />
              <span className="text-sm font-medium text-gray-700">
                SMS Notifications
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="orderNotifications"
                checked={settings.orderNotifications}
                onChange={handleChange}
                className="rounded text-gold-500 focus:ring-gold-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Order Notifications
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="lowStockAlert"
                checked={settings.lowStockAlert}
                onChange={handleChange}
                className="rounded text-gold-500 focus:ring-gold-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Low Stock Alerts
              </span>
            </label>
            {settings.lowStockAlert && (
              <div className="ml-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  name="lowStockThreshold"
                  value={settings.lowStockThreshold}
                  onChange={handleChange}
                  className="input-field w-full md:w-64"
                  min="1"
                />
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between card">
          {saved && (
            <div className="text-green-600 font-medium">
              Settings saved successfully!
            </div>
          )}
          <button
            type="submit"
            className="btn-primary flex items-center space-x-2 ml-auto"
          >
            <Save size={20} />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
