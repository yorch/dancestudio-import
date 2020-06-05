require('dotenv').config();

const { login } = require('./login');
const { parseStudentList } = require('./parse-student-list');

const getStudentList = async ({ authenticatedRequest }) => {
    const { body: studentList } = await authenticatedRequest(
        'report_active_students_alpha_last.php'
    );

    if (studentList.includes('Your trial period has ended')) {
        throw new Error(
            'Could not get the student list as the account is on a trial that has ended'
        );
    }

    return parseStudentList(studentList);
};

(async () => {
    try {
        const { authenticatedRequest } = await login();

        const list = await getStudentList({ authenticatedRequest });

        console.log(list);
    } catch (err) {
        console.error(err);
    }
})();
