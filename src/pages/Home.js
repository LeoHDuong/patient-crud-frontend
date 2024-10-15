import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import DeleteAlert from '../component/DeleteAlert';
import Container from '../component/Container';
import { Alert } from '@mui/material';

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.roles.map(role => role.replace("ROLE_", ""));
    
    // Access control based on user roles
    const hasEditAccess = (userRoles.includes("EDITOR") || userRoles.includes("ADMIN"));
    
    // State definitions
    const [patients, setPatients] = useState([]);
    const [filters, setFilters] = useState({
        index: '',
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        email: '',
        phoneNumber: ''
    });
    const [appliedFilters, setAppliedFilters] = useState({}); // For filters after applying
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(5);

    // Apply search parameters to filters on page load
    useEffect(() => {
        setFilters({
            index: searchParams.get('index') || '',
            firstName: searchParams.get('firstName') || '',
            lastName: searchParams.get('lastName') || '',
            gender: searchParams.get('gender') || '',
            age: searchParams.get('age') || '',
            email: searchParams.get('email') || '',
            phoneNumber: searchParams.get('phoneNumber') || ''
        });
    }, [searchParams]);

    // Filter patients based on applied filters
    const filteredPatients = patients.filter((patient, index) => {
        const patientIndex = index + 1;
        return (
            (!appliedFilters.index || patientIndex === Number(appliedFilters.index)) &&
            (!appliedFilters.firstName || patient.firstName.toLowerCase().includes(appliedFilters.firstName.toLowerCase())) &&
            (!appliedFilters.lastName || patient.lastName.toLowerCase().includes(appliedFilters.lastName.toLowerCase())) &&
            (!appliedFilters.gender || patient.gender.toLowerCase().includes(appliedFilters.gender.toLowerCase())) &&
            (!appliedFilters.age || patient.age.toString().includes(appliedFilters.age)) &&
            (!appliedFilters.email || patient.email.toLowerCase().includes(appliedFilters.email.toLowerCase())) &&
            (!appliedFilters.phoneNumber || patient.phoneNumber.toLowerCase().includes(appliedFilters.phoneNumber.toLowerCase()))
        );
    });

    // Derived variables for pagination
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
    const [noPatientFound, setNoPatientFound] = useState(false);
    
    // Fetch patients data on initial render
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/patients`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page: 0, limit: 100 }
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error.response.data);
            }
        };
    
        fetchPatients();
    }, [currentPage, patientsPerPage, token]);
    

    useEffect(() => {
        setCurrentPage(totalPages > 0 ? 1 : 0);
        setNoPatientFound(totalPages > 0 ? false : true)
    }, [totalPages]);

    // Handle input change for filters
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Handle filter application
    const handleApplyFilter = () => {
        setAppliedFilters(filters);

        const params = {};
        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                params[key] = filters[key];
            }
        });
        setSearchParams(params);
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className='container'>
            {noPatientFound && (
            <Container>
                <Alert severity="warning">
                    No patient found!
                </Alert>
            </Container>)}
            <div className='py-4'>
                {/* Filter Inputs */}
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Index"
                            name="index"
                            value={filters.index}
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
                            {hasEditAccess && (
                                <th scope="col">Action</th>
                            )}
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
                                {hasEditAccess && (
                                    <td>
                                        <Link to={`/editpatient/${patient.id}`} className='btn btn-outline-primary mx-2'>
                                            Edit
                                        </Link>
                                        {userRoles.includes('ADMIN') && (
                                            <DeleteAlert
                                                patientId={patient.id}
                                                onPatientDeleted={(deletedId) => {
                                                    setPatients((prev) => prev.filter((p) => p.id !== deletedId));
                                                }}
                                            />
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination and Create Patient Button */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                        <button
                            className="btn btn-secondary me-2"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || currentPage === 0}
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
                    {hasEditAccess && (
                        <Link to="/createpatient" className="btn btn-primary">
                            Create Patient
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
