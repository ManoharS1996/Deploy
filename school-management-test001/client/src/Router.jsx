import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './Components/SchoolManagement/Login/Login';
import SideNavbar from './Components/SchoolManagement/SideNavbar/SideNavbar';
import Dashboard from './Components/SchoolManagement/Dashboard/Dashboard';
// import SchoolList from './Components/SchoolManagement/Schools/SchoolList';
import SchoolReusable from './Components/SchoolManagement/Schools/SchoolReusable';
import CreateSchool from './Components/SchoolManagement/Schools/SchoolForm/CreateSchool';
import SchoolDetailView from './Components/SchoolManagement/Schools/SchoolForm/SchoolDetailView';
// import StudentsList from './Components/SchoolManagement/Student/StudentsList';
// import StaffList from './Components/SchoolManagement/Staff/StaffList';
import StudentReusable from './Components/SchoolManagement/Student/StudentReusable';
import StaffReusable from './Components/SchoolManagement/Staff/StaffReusable';
import StudentDetailView from './Components/SchoolManagement/Student/StudentForm/StudentDetailView';
import StaffDetailView from './Components/SchoolManagement/Staff/StaffForm/StaffDetailView';
import CreateStaff from './Components/SchoolManagement/Staff/StaffForm/CreateStaff';
import CreateStudent from './Components/SchoolManagement/Student/StudentForm/CreateStudent';
import CreateReceipt from './Components/SchoolManagement/Fees/FeeForm/CreateReceipt';
import FeeTable from './Components/SchoolManagement/Fees/FeeList';
import FeeDetailView from './Components/SchoolManagement/Fees/FeeForm/FeeDetailView';
import Billing from './Components/SchoolManagement/Billing/Billing';
import BillingDetailView from './Components/SchoolManagement/Billing/BillingDetailView';
import Academics from './Components/SchoolManagement/Academics/Academics';
import CreateAttendence from './Components/SchoolManagement/Academics/Attendance/CreateAttendence';
import AttendenceDetailView from './Components/SchoolManagement/Academics/Attendance/AttendenceDetailView';
// import Diary from './Components/SchoolManagement/Academics/Diary/Diary';
import DiaryReusable from './Components/SchoolManagement/Academics/Diary/DiaryReusable';
import NewDiary from './Components/SchoolManagement/Academics/Diary/NewDiary';
import DiaryView from './Components/SchoolManagement/Academics/Diary/DiaryView';
import CreateDiary from './Components/SchoolManagement/Academics/Diary/CreateDiary';
import CreateResult from './Components/SchoolManagement/Academics/Results/CreateResult';
import Result from './Components/SchoolManagement/Academics/Results/Result';
import ExamResults from './Components/SchoolManagement/Academics/Results/ExamResults';
import ResultDetailView from './Components/SchoolManagement/Academics/Results/ResultDetailView';
import CreateAssignment from './Components/SchoolManagement/Academics/Assignments/CreateAssignment';
import Assignments from './Components/SchoolManagement/Academics/Assignments/Assignments';
import AssignmentDetailView from './Components/SchoolManagement/Academics/Assignments/AssignmentDetailView';
import ClassNotes from './Components/SchoolManagement/Academics/ClassNotes/ClassNotes';
import ClassNotesDetailView from './Components/SchoolManagement/Academics/ClassNotes/ClassNotesDetailView';
import AddClassNotes from './Components/SchoolManagement/Academics/ClassNotes/AddClassNotes';
import Exams from './Components/SchoolManagement/Academics/Exams/Exams';
import ExamDetailView from './Components/SchoolManagement/Academics/Exams/ExamsDetailView';
import AddExam from './Components/SchoolManagement/Academics/Exams/AddExam';
import CircularReusable from './Components/SchoolManagement/Circular/CircularReusable';
import CircularDetailView from './Components/SchoolManagement/Circular/CircularDetailView';
import AddCircular from './Components/SchoolManagement/Circular/AddCircular';
import TransportReusable from './Components/SchoolManagement/Transportation/TransportReusable';
// import TransportationList from './Components/SchoolManagement/Transportation/TransportationList';
import CreateTransport from './Components/SchoolManagement/Transportation/TransportationForm/CreateTransport';
import TransportDetailView from './Components/SchoolManagement/Transportation/TransportationForm/TransportDetailView';
// import Inventory from './Components/SchoolManagement/Inventory/Inventory';
import InventoryReusable from './Components/SchoolManagement/Inventory/InventoryReusable';
import InventoryDetailView from './Components/SchoolManagement/Inventory/InventoryDetailView';
import CreateInventory from './Components/SchoolManagement/Inventory/CreateInventory';
import CreateBook from './Components/SchoolManagement/Library/CreateBook';
import BooksDetailView from './Components/SchoolManagement/Library/BooksDetailView';
import BookHistory from './Components/SchoolManagement/Library/BookHistory';
import LibraryView from './Components/SchoolManagement/Library/LibraryView/LibraryView';
import LibraryReusable from './Components/SchoolManagement/Library/LibraryReusable';
import Users from './Components/SchoolManagement/Library/LibraryUsers/Users';
import AddBook from './Components/SchoolManagement/Library/LibraryUsers/AddBook';
import Care from './Components/SchoolManagement/Care/Care';
import CareDetailView from './Components/SchoolManagement/Care/CareDetailView';
// import Calendar from './Components/SchoolManagement/Calendar/Calendar';
import NewCalendar from './Components/SchoolManagement/Calendar/NewCalender';
import MyCalendar from './Components/SchoolManagement/Calendar/buttons';
import Example from './Components/SchoolManagement/Calendar/example';

const router = createBrowserRouter([
    {
        path: '/dashboard',
        element:<Dashboard/>
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path:'/',
        element:<Dashboard/>
    },
    {
        path:'/nav',
        element:<SideNavbar/>
    },
    {
        path:'/schoolList',
        element:<SchoolReusable/>
    },
    {
        path:'/studentsList',
        element:<StudentReusable/>
    },
    {
        path:'/createSchool',
        element:<CreateSchool/>
    },
    {
        path:'/schoolDetailView/:instituteId',
        element:<SchoolDetailView/>
    },
    {
        path:'/studentDetailView/:studentId',
        element:<StudentDetailView/>
    },
    {
        path:'/createStudent',
        element:<CreateStudent/>
    },
    {
        path:'/staffList',
        element:<StaffReusable/>
    },
    {
        path:'/createStaff',
        element:<CreateStaff/>
    },
    {
        path:'/staffDetailView/:staffId',
        element:<StaffDetailView/>
    },
    {
        path:'/createReceipt',
        element:<CreateReceipt/>
    },
    {
        path:'/feeTable',
        element:<FeeTable/>
    },
    {
        path:'/feeDetailView',
        element:<FeeDetailView/>
    },
    {
        path:'/billing',
        element:<Billing/>
    },
    {
        path:'/billingDetailView',
        element:<BillingDetailView/>
    },
    {
        path:'/academics',
        element:<Academics/>
    },
    {
        path:'/createAttendence',
        element:<CreateAttendence/>
    },
    {
        path:'/attendenceDetailView',
        element:<AttendenceDetailView/>
    },
    {
        path:'/diary',
        element:<DiaryReusable/>
    },
    {
        path:'/newDiary',
        element:<NewDiary/>
    },
    {
        path:'/diaryView/:diaryId',
        element:<DiaryView/>
    },
    {
        path:'/createDiary',
        element:<CreateDiary/>
    },
    {
        path:'/result',
        element:<Result/>
    },
    {
        path:'/createResult',
        element:<CreateResult/>
    },
    {
        path:'/examResults',
        element:<ExamResults/>
    },
    {
        path:'/addExam',
        element:<AddExam/>
    },
    {
        path:'/resultDetailView',
        element:<ResultDetailView/>
    },
    {
        path:'/createAssignment',
        element:<CreateAssignment/>
    },
    {
        path:'/assignments',
        element:<Assignments/>
    },
    {
        path:'/assignmentDetailView/:assignmentId',
        element:<AssignmentDetailView/>
    },
    {
        path:'/classNotes',
        element:<ClassNotes/>
    },
    {
        path:'/classNotesDetailView',
        element:<ClassNotesDetailView/>
    },
    {
        path:'/addClassNotes',
        element:<AddClassNotes/>
    },
    {
        path:'/exams',
        element:<Exams/>
    },
    {
        path:'/examsDetailView',
        element:<ExamDetailView/>
    },
    {
        path:'/circular',
        element:<CircularReusable/>
    },
    {
        path:'/circularDetailView/:circularId',
        element:<CircularDetailView/>
    },
    {
        path:'/addCircular',
        element:<AddCircular/>
    },
    {
        path:'/transportList',
        element:<TransportReusable/>
    },
    {
        path:'/createTransport',
        element:<CreateTransport/>
    },
    {
        path:'/transportDetailView/:studentId',
        element:<TransportDetailView/>
    },
    {
        path:'/libraryView',
        element:<LibraryView/>
    },
    {
        path:'/createBook',
        element:<CreateBook/>
    },
    {
        path:'/booksDetailView/:bookId',
        element:<BooksDetailView/>
    },
    {
        path:'/bookHistory',
        element:<BookHistory/>
    },
    {
        path:'/library',
        element:<LibraryReusable/>
    },
    {
        path:'/users',
        element:<Users/>
    },
    {
        path:'/addBook',
        element:<AddBook/>
    },
    {
        path:'/inventory',
        element:<InventoryReusable/>
    },
    {
        path:'/createInventory',
        element:<CreateInventory/>
    },
    {
        path:'/inventoryDetailView/:itemId',
        element:<InventoryDetailView/>
    },
    {
        path:'/care',
        element:<Care/>
    },
    {
        path:'/careDetailView/:studentId',
        element:<CareDetailView/>
    },
    {
        path:'/myCalendar',
        element:<MyCalendar/>
    },
    {
        path:'/newCalendar',
        element:<NewCalendar/>
    },
    {
        path:'/example',
        element:<Example/>
    },
]);

export default router;
