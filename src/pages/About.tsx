
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Book, Clock, Phone, Mail, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-library-primary mb-4">About LearnSpace Library</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your gateway to knowledge and learning resources. We're dedicated to serving the academic needs of students and faculty.
          </p>
        </div>
        
        {/* Mission section */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-library-primary mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              LearnSpace Library is committed to fostering a dynamic environment where knowledge flourishes and academic excellence is nurtured. We strive to provide comprehensive resources and services that support the educational and research needs of our diverse community.
            </p>
            <p className="text-gray-700 mb-4">
              Our goal is to empower students and faculty by providing access to high-quality information resources, promoting information literacy, and preserving knowledge for future generations.
            </p>
            <p className="text-gray-700">
              We believe that free and open access to information is essential for intellectual growth, innovation, and the advancement of society as a whole.
            </p>
          </div>
          
          <div className="md:w-1/2">
            <div className="h-full w-full rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1415&auto=format&fit=crop" 
                alt="University library" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Key features section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-library-primary mb-8 text-center">Library Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-library-primary bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-library-primary" />
                </div>
                <CardTitle>Extensive Collection</CardTitle>
                <CardDescription>
                  Access thousands of books, journals, and academic resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our library houses a diverse collection spanning fiction, non-fiction, academic texts, and specialized research journals to meet all educational needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-library-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-library-secondary" />
                </div>
                <CardTitle>Personalized Access</CardTitle>
                <CardDescription>
                  Tailored features for students and faculty members.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our role-based system ensures students and faculty get customized permissions and features suited to their specific academic requirements.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-library-accent bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                  <Book className="h-6 w-6 text-library-accent" />
                </div>
                <CardTitle>Digital Resources</CardTitle>
                <CardDescription>
                  E-books, online journals, and research databases.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our digital collection provides instant access to e-books, academic papers, and research materials that can be accessed anywhere, anytime.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-library-green bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-library-green" />
                </div>
                <CardTitle>Convenient Services</CardTitle>
                <CardDescription>
                  Easy borrowing, renewal, and reservation system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our intuitive online platform makes it simple to borrow, return, renew, and reserve books with just a few clicks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Library info section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-library-primary mb-8 text-center">Library Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Hours of Operation</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Monday - Thursday</td>
                      <td className="py-2 text-right">8:00 AM - 10:00 PM</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Friday</td>
                      <td className="py-2 text-right">8:00 AM - 6:00 PM</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Saturday</td>
                      <td className="py-2 text-right">10:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Sunday</td>
                      <td className="py-2 text-right">12:00 PM - 8:00 PM</td>
                    </tr>
                  </tbody>
                </table>
                
                <p className="text-sm text-gray-500 mt-4">
                  * Hours may vary during holidays and exam periods.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-library-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">
                      123 University Avenue,<br />
                      Campus District,<br />
                      Academic City, AC 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-library-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-library-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@learnspace.edu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Library policies section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-library-primary mb-8 text-center">Library Policies</h2>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-library-primary mb-4">Borrowing Rules</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Students can borrow up to 5 books at a time for 14 days</li>
                  <li>Faculty members can borrow up to 10 books at a time for 30 days</li>
                  <li>Books can be renewed up to 2 times if not reserved by another user</li>
                  <li>Reference materials and rare books cannot be borrowed</li>
                  <li>E-books can be downloaded and accessed for 21 days</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-library-primary mb-4">Fines and Fees</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Overdue books incur a fine of $0.50 per day</li>
                  <li>Maximum fine per book is capped at $20</li>
                  <li>Lost or damaged books must be replaced or paid for at current market value</li>
                  <li>Unpaid fines may result in borrowing privileges being suspended</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-library-primary mb-4">Library Conduct</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Maintain silence in designated quiet study areas</li>
                <li>Food is not permitted in the library; covered beverages are allowed</li>
                <li>Library materials must be properly checked out before removal</li>
                <li>Respect the rights of other library users and staff</li>
                <li>Follow proper care when handling library materials and equipment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
