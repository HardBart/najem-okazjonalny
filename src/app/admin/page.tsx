'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { Order } from '@/types';
import { formatDate, formatPrice } from '@/lib/utils';
import { LogOut, Search, Download, KeyRound } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    // Check if already authenticated
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, filterStatus]);

  const checkAuth = async () => {
    // In a real implementation, verify token on server
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setLoginError('Nieprawidłowe dane logowania');
      }
    } catch (error) {
      setLoginError('Błąd połączenia');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setOrders([]);
  };

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const markRealized = async (orderId: string) => {
    if (!confirm('Oznaczyć zamówienie jako zrealizowane? Spowoduje to niezwłoczne usunięcie numeru PESEL (RODO).')) {
      return;
    }
    try {
      const res = await fetch('/api/admin/order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderStatus: 'completed' }),
      });
      if (res.ok) {
        await loadOrders();
      } else {
        alert('Nie udało się zaktualizować statusu.');
      }
    } catch {
      alert('Błąd połączenia.');
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (searchTerm) {
      filtered = filtered.filter(
        order =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.personalData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.personalData.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.personalData.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.orderStatus === filterStatus);
    }

    setFilteredOrders(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      'ID Zamówienia',
      'Imię',
      'Nazwisko',
      'Email',
      'Telefon',
      'Pakiet',
      'Kwota',
      'Status płatności',
      'Status zamówienia',
      'Data utworzenia',
    ];

    const rows = filteredOrders.map(order => [
      order.orderId,
      order.personalData.firstName,
      order.personalData.lastName,
      order.personalData.email,
      order.personalData.phone,
      order.package,
      order.amount.toString(),
      order.paymentStatus,
      order.orderStatus,
      order.createdAt,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `zamowienia-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const labels = {
      new: 'Nowe',
      in_progress: 'W realizacji',
      completed: 'Zrealizowane',
      cancelled: 'Anulowane',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-gray-100 text-gray-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const labels = {
      pending: 'Oczekuje',
      completed: 'Opłacone',
      failed: 'Nieudane',
      cancelled: 'Anulowane',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-navy-900" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900">Panel Admina</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Nazwa użytkownika
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Hasło
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg">
              Zaloguj się
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-navy-900">Panel Admina</h1>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Wyloguj
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Wszystkie zamówienia</div>
            <div className="text-3xl font-bold text-navy-900">{orders.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Nowe</div>
            <div className="text-3xl font-bold text-blue-600">
              {orders.filter(o => o.orderStatus === 'new').length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-600 mb-1">W realizacji</div>
            <div className="text-3xl font-bold text-yellow-600">
              {orders.filter(o => o.orderStatus === 'in_progress').length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Zrealizowane</div>
            <div className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.orderStatus === 'completed').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Szukaj po ID, imieniu, nazwisku, emailu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Wszystkie statusy</option>
                <option value="new">Nowe</option>
                <option value="in_progress">W realizacji</option>
                <option value="completed">Zrealizowane</option>
                <option value="cancelled">Anulowane</option>
              </select>
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Zamówienia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Klient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pakiet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kwota
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Płatność
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dokument
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    RODO / Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                      Brak zamówień
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.personalData.firstName} {order.personalData.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{order.personalData.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {order.package}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(order.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.orderStatus)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.invoiceDoc ? (
                          <a
                            href={`/api/admin/faktura-pdf?orderId=${encodeURIComponent(order.orderId)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-gold-700 hover:text-gold-800 font-medium"
                            title={order.invoiceDoc.type === 'faktura' ? 'Faktura' : 'Rachunek'}
                          >
                            <Download className="w-4 h-4" />
                            {order.invoiceDoc.number}
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex flex-col gap-1">
                          {order.peselDeletedAt ? (
                            <span className="inline-flex items-center gap-1 text-green-700" title={`Usunięto: ${formatDate(order.peselDeletedAt)}`}>
                              <KeyRound className="w-3.5 h-3.5" /> PESEL usunięty
                            </span>
                          ) : order.personalData.pesel ? (
                            <span className="inline-flex items-center gap-1 text-amber-700" title="PESEL nadal przechowywany">
                              <KeyRound className="w-3.5 h-3.5" /> PESEL w bazie
                            </span>
                          ) : null}
                          {order.paymentStatus === 'completed' && order.orderStatus !== 'completed' && (
                            <button
                              onClick={() => markRealized(order.orderId)}
                              className="inline-flex w-fit items-center rounded-md bg-navy-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-navy-800"
                            >
                              Oznacz zrealizowane
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
