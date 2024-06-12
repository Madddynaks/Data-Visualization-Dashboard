import React, { useState } from 'react';

const DataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const itemsPerPage = 10;
  const visiblePagesCount = 3;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getVisiblePages = () => {
    if (currentPage <= visiblePagesCount) {
      return Array.from({ length: Math.min(visiblePagesCount, totalPages) }, (_, i) => i + 1);
    } else {
      const start = Math.max(currentPage - Math.floor(visiblePagesCount / 2), 1);
      const end = Math.min(start + visiblePagesCount - 1, totalPages);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  };

  const filteredData = data.filter(item => {
    if (
      (selectedCountry && item.country !== selectedCountry) ||
      (selectedTopic && item.topic !== selectedTopic) ||
      (selectedSector && item.sector !== selectedSector) ||
      (selectedRegion && item.region !== selectedRegion)
    ) {
      return false;
    }
    return true;
  });

  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="">
      <div className='grid grid-cols-2 gap-5'>
        <div className="filter-container">
          <label htmlFor="countryFilter" className='text-lg font-semibold'>Filter by Country: </label>
          <select
            id="countryFilter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className='border border-gray-400 rounded-lg text-center'
          >
            <option value="">All</option>
            {/* Assuming data contains unique country names */}
            {Array.from(new Set(data.map(item => item.country))).map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label htmlFor="topicFilter" className='text-lg font-semibold'>Filter by Topic: </label>
          <select
            id="topicFilter"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className='border border-gray-400 rounded-lg text-center'
          >
            <option value="">All</option>
            {/* Assuming data contains unique topic names */}
            {Array.from(new Set(data.map(item => item.topic))).map((topic, index) => (
              <option key={index} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label htmlFor="sectorFilter" className='text-lg font-semibold'>Filter by Sector: </label>
          <select
            id="sectorFilter"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className='border border-gray-400 rounded-lg text-center'
          >
            <option value="">All</option>
            {/* Assuming data contains unique sector names */}
            {Array.from(new Set(data.map(item => item.sector))).map((sector, index) => (
              <option key={index} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label htmlFor="regionFilter" className='text-lg font-semibold'>Filter by Region: </label>
          <select
            id="regionFilter"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className='border border-gray-400 rounded-lg text-center'
          >
            <option value="">All</option>
            {/* Assuming data contains unique region names */}
            {Array.from(new Set(data.map(item => item.region))).map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Sector</th>
            <th>Region</th>
            <th>Country</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="table-row">
              <td className='text-center'>{item.topic}</td>
              <td className='text-center'>{item.sector}</td>
              <td className='text-center'>{item.region}</td>
              <td className='text-center'>{item.country}</td>
              <td className='text-center'>{item.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination flex justify-center items-center">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => handleClickPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
