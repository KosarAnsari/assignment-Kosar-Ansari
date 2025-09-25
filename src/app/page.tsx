'use client'

import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'

const PAGE_SIZE = 12

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [serviceFilter, setServiceFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState([0, 2000]) 

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/workers')
        if (!res.ok) throw new Error('Failed to fetch data')
        const data = await res.json()
        setWorkersData(data)
      } catch (err) {
        setError('Failed to load workers. Please try again later.')
        setWorkersData([])
      } finally {
        setLoading(false)
      }
    }
    fetchWorkers()
  }, [])

  const availableServices = useMemo(() => {
    const services = Array.from(new Set(workersData.map(w => w.service)))
    return ['All', ...services]
  }, [workersData])

  const filteredWorkers = useMemo(() => {
    return workersData
      .filter(w => (serviceFilter === 'All' ? true : w.service === serviceFilter))
      .filter(w => w.pricePerDay >= priceFilter[0] && w.pricePerDay <= priceFilter[1])
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, serviceFilter, priceFilter])

  const totalPages = Math.ceil(filteredWorkers.length / PAGE_SIZE)
  const paginatedWorkers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredWorkers.slice(start, start + PAGE_SIZE)
  }, [filteredWorkers, currentPage])

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServiceFilter(e.target.value)
    setCurrentPage(1)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter([0, Number(e.target.value)])
    setCurrentPage(1)
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Our Workers
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-6 text-white">
        <label className="flex items-center gap-2">
          Service:
          <select
            value={serviceFilter}
            onChange={handleServiceChange}
            className="rounded p-2 bg-white text-gray-900"
          >
            {availableServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          Max Price/Day: ₹{priceFilter[1]}
          <input
            type="range"
            min={0}
            max={2000}
            value={priceFilter[1]}
            onChange={handlePriceChange}
            className="ml-2"
          />
        </label>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(PAGE_SIZE)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-800 h-64 rounded-lg" />
          ))}
        </div>
      )}

      {/* Error Message */}
      {!loading && error && (
        <div className="bg-red-200 text-red-800 p-4 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* Worker Cards */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedWorkers.map((worker) => (
              <div
                key={worker.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={worker.image}
                    alt={worker.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    priority={worker.id <= 10}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{worker.name}</h2>
                  <p className="text-gray-600">{worker.service}</p>
                  <p className="mt-2 font-medium">
                    ₹{Math.round(worker.pricePerDay * 1.18)} / day
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>

            <span className="text-white self-center">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  )
}
