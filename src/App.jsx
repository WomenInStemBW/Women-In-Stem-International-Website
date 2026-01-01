import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Navbar from './components/navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import SortableTableRow from './components/SortableTableRow';

// Import public pages
import Home from './pages/Home';
import AstroSpace from './pages/AstroSpace';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Teams from './pages/Teams';
import Opportunities from './pages/Opportunities';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import About from './pages/About';
import Store from './pages/Store';
import OfferBooking from './pages/OfferBooking';

// Import admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBlogs from './pages/admin/ManageBlogs';
import CreateBlog from './pages/admin/CreateBlog';
import EditBlog from './pages/admin/EditBlog';
import ManagePodcasts from './pages/admin/ManagePodcasts';
import CreatePodcast from './pages/admin/CreatePodcast';
import ManageTeams from './pages/admin/ManageTeams';
import CreateTeam from './pages/admin/CreateTeam';
import EditTeam from './pages/admin/EditTeam';
import ManageTeamMembers from './pages/admin/ManageTeamMembers';

import ManageGroups from './pages/admin/ManageGroups';
import CreateGroup from './pages/admin/CreateGroup';
import EditGroup from './pages/admin/EditGroup';
import ManageContacts from './pages/admin/ManageContacts';

import CreateOpportunity from './pages/admin/CreateOpportunity';
import ManageOpportunities from './pages/admin/ManageOpportunities';
import EditOpportunity from './pages/admin/EditOpportunity';
import ManageOffers from './pages/admin/ManageOffers';
import StoreRegistration from './pages/StoreRegistration';
import CreateStoreItem from './pages/admin/CreateStoreItem';
import ManageStore from './pages/admin/ManageStore';
import EditStoreItem from './pages/admin/EditStoreItem';

// Import Context
import { AuthProvider } from './context/AuthContext';

// Import CSS
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Navbar will appear on all pages */}
          <Navbar />

          {/* Page content will change based on the route */}
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/astro-space" element={<AstroSpace />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/register/:itemId" element={<StoreRegistration />} />
              <Route path="/offers/book/:offerId" element={<OfferBooking />} />

              {/* Admin Login (Not Protected) */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/blogs"
                element={
                  <ProtectedRoute>
                    <ManageBlogs />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/blogs/create"
                element={
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/blogs/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditBlog />
                  </ProtectedRoute>
                }
              />

              {/* New Opportunity Management Routes */}
              <Route
                path="/admin/opportunities"
                element={
                  <ProtectedRoute>
                    <ManageOpportunities />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/opportunities/create"
                element={
                  <ProtectedRoute>
                    <CreateOpportunity />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/opportunities/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditOpportunity />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/podcasts"
                element={
                  <ProtectedRoute>
                    <ManagePodcasts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/podcasts/create"
                element={
                  <ProtectedRoute>
                    <CreatePodcast />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/teams"
                element={
                  <ProtectedRoute>
                    <ManageTeams />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/teams/create"
                element={
                  <ProtectedRoute>
                    <CreateTeam />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/teams/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditTeam />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/teams/members/:teamId"
                element={
                  <ProtectedRoute>
                    <ManageTeamMembers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/groups"
                element={
                  <ProtectedRoute>
                    <ManageGroups />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/groups/create"
                element={
                  <ProtectedRoute>
                    <CreateGroup />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/groups/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditGroup />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/contacts"
                element={
                  <ProtectedRoute>
                    <ManageContacts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/offers"
                element={
                  <ProtectedRoute>
                    <ManageOffers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/store/manage"
                element={
                  <ProtectedRoute>
                    <ManageStore />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/store/create"
                element={
                  <ProtectedRoute>
                    <CreateStoreItem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/store/update/:itemId"
                element={
                  <ProtectedRoute>
                    <EditStoreItem />
                  </ProtectedRoute>
                }
              />

              {/* 404 page */}
              <Route path="*" element={
                <div className="container-fluid py-5">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-6 text-center">
                      <h1>404 - Page Not Found</h1>
                      <p className="lead">The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;