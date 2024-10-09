import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import DeleteAlert from './DeleteAlert';

function Home() {
    const [patients, setPatients] = useState([]);
    const [filters, setFilters] = useState({
        index: '',         // Added index filter
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        email: '',
        phoneNumber: ''
    });
    const [appliedFilters, setAppliedFilters] = useState({}); // For filters after applying
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(5);

    useEffect(() => {
        // Check if user is authenticated (i.e., if token exists)
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if token doesn't exist
        } else {
            // Fetch patient data
            const fetchPatients = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/patients', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setPatients(response.data);
                } catch (error) {
                    console.error('Error updating patient:', error.response.data);
                }
            };

            fetchPatients();
        }
    }, [navigate]);

    useEffect(() => {
        // Apply URL search parameters to filters on load
        setFilters({
            index: searchParams.get('index') || '',    // Apply index filter from URL params
            firstName: searchParams.get('firstName') || '',
            lastName: searchParams.get('lastName') || '',
            gender: searchParams.get('gender') || '',
            age: searchParams.get('age') || '',
            email: searchParams.get('email') || '',
            phoneNumber: searchParams.get('phoneNumber') || ''
        });
    }, [searchParams]);

    // Handle filter input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    // Handle apply filter button
    const handleApplyFilter = () => {
        // Set applied filters based on the current filter values
        setAppliedFilters(filters);

        // Set URL search parameters based on the filter values
        const params = {};
        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                params[key] = filters[key];
            }
        });
        setSearchParams(params);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Filter patients based on the applied filters
    const filteredPatients = patients.filter((patient, index) => {
        const patientIndex = index + 1; // Index starts from 1 in the table
        return (
            (!appliedFilters.index || patientIndex.toString().includes(appliedFilters.index)) && // Filter by index
            (!appliedFilters.firstName || patient.firstName.toLowerCase().includes(appliedFilters.firstName.toLowerCase())) &&
            (!appliedFilters.lastName || patient.lastName.toLowerCase().includes(appliedFilters.lastName.toLowerCase())) &&
            (!appliedFilters.gender || patient.gender.toLowerCase().includes(appliedFilters.gender.toLowerCase())) &&
            (!appliedFilters.age || patient.age.toString().includes(appliedFilters.age)) &&
            (!appliedFilters.email || patient.email.toLowerCase().includes(appliedFilters.email.toLowerCase())) &&
            (!appliedFilters.phoneNumber || patient.phoneNumber.toLowerCase().includes(appliedFilters.phoneNumber.toLowerCase()))
        );
    });

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

    return (
        <div className='container'>
            <div className='py-4'>
                {/* Filter Inputs */}
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Index"
                            name="index"
                            value={filters.index}  // Added index input field
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="firstName"
                            value={filters.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="lastName"
                            value={filters.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Gender"
                            name="gender"
                            value={filters.gender}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Age"
                            name="age"
                            value={filters.age}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={filters.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone No."
                            name="phoneNumber"
                            value={filters.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" onClick={handleApplyFilter}>
                            Apply Filter
                        </button>
                    </div>
                </div>

                {/* Patient Table */}
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Patient Index</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Age</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPatients.map((patient, index) => (
                            <tr key={index}>
                                <th scope="row">{indexOfFirstPatient + index + 1}</th>
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.age}</td>
                                <td>{patient.email}</td>
                                <td>{patient.phoneNumber}</td>
                                <td>
                                    <Link to={`/editpatient/${patient.id}`} className='btn btn-outline-primary mx-2'>
                                        Edit
                                    </Link>
                                    <DeleteAlert
                                        patientId={patient.id}
                                        onPatientDeleted={(deletedId) => {
                                            setPatients((prev) => prev.filter((p) => p.id !== deletedId));
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                        <button
                            className="btn btn-secondary me-2"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            className="btn btn-secondary ms-2"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                    <Link to="/createpatient" className="btn btn-primary">
                        Create Patient
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;