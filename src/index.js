require('dotenv').config();

const { login } = require('./login');
const { parseStudentList } = require('./parse-student-list');

(async () => {
    const { authenticatedRequest } = await login();

    const { body: studentList } = await authenticatedRequest('report_active_students_alpha_last.php');

    const list = parseStudentList(studentList);

    console.log(list);
})();
