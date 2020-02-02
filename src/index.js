require('dotenv').config();

const { login } = require('./login');
const { parseStudentList } = require('./parse-student-list');

const getStudentList = async ({ authenticatedRequest }) => {
    const { body: studentList } = await authenticatedRequest('report_active_students_alpha_last.php');

    return parseStudentList(studentList);
};

(async () => {
    const { authenticatedRequest } = await login();

    const list = await getStudentList({ authenticatedRequest });

    console.log(list);
})();
