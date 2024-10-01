// script.js

// التعامل مع نموذج الامتحانات
const examForm = document.getElementById('exam-form');
examForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('exam-name').value;
    const date = document.getElementById('exam-date').value;
    const percentage = document.getElementById('exam-percentage').value;
    
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    exams.push({ name, date, percentage });
    localStorage.setItem('exams', JSON.stringify(exams));
    
    examForm.reset();
    updateChart();
    displayExamsData(); // تحديث جدول إدارة البيانات
});

// التعامل مع نموذج الواجبات
const assignmentForm = document.getElementById('assignment-form');
assignmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('assignment-name').value;
    const deadline = document.getElementById('assignment-deadline').value;
    const description = document.getElementById('assignment-description').value;
    
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    assignments.push({ 
        name, 
        deadline, 
        description,
        serial: assignments.length + 1 // إضافة تسلسل تلقائي إذا رغبت
    });
    localStorage.setItem('assignments', JSON.stringify(assignments));
    
    assignmentForm.reset();
    displayAssignments();
    displayAssignmentsData(); // تحديث جدول إدارة البيانات
    alert('تمت إضافة الواجب بنجاح!');
});

// التعامل مع نموذج الحصص الدراسية
const classForm = document.getElementById('class-form');
classForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const className = document.getElementById('class-name').value;
    const subject = document.getElementById('class-subject').value;
    const date = document.getElementById('class-date').value;
    const type = document.getElementById('class-type').value;
    
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes.push({ className, subject, date, type });
    localStorage.setItem('classes', JSON.stringify(classes));
    
    classForm.reset();
    displayClasses();
});

// عرض الحصص الدراسية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayClasses();
    displayAssignments();
    displayExamsData();
    displayAssignmentsData();
    updateChart();
});

// دالة لعرض الحصص الدراسية في الجدول
function displayClasses() {
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    const classesTableBody = document.querySelector('#classes-table tbody');
    classesTableBody.innerHTML = '';
    
    classes.forEach((cls, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${cls.className}</td>
            <td>${cls.subject}</td>
            <td>${cls.date}</td>
            <td>${cls.type}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteClass(${index})">حذف</button>
            </td>
        `;
        
        classesTableBody.appendChild(row);
    });
}

// دالة لحذف حصة دراسية
function deleteClass(index) {
    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes.splice(index, 1);
    localStorage.setItem('classes', JSON.stringify(classes));
    displayClasses();
}

// دالة لعرض الواجبات في الجدول
function displayAssignments() {
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const assignmentsTableBody = document.querySelector('#assignments-table tbody');
    assignmentsTableBody.innerHTML = '';
    
    assignments.forEach((assignment, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${assignment.serial || index + 1}</td>
            <td>${assignment.name}</td>
            <td>${assignment.number_of_questions || 'N/A'}</td>
            <td>${assignment.result || 'N/A'}</td>
            <td>${assignment.solved_questions || 'N/A'}</td>
            <td>${assignment.correct_questions || 'N/A'}</td>
            <td>${assignment.answers || 'N/A'}</td>
            <td>${assignment.start_time || 'N/A'}</td>
            <td>${assignment.end_time || 'N/A'}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteAssignment(${index})">حذف</button>
            </td>
        `;
        
        assignmentsTableBody.appendChild(row);
    });
}

// دالة لحذف واجب
function deleteAssignment(index) {
    let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    assignments.splice(index, 1);
    localStorage.setItem('assignments', JSON.stringify(assignments));
    displayAssignments();
    displayAssignmentsData(); // تحديث جدول إدارة البيانات
}

// إعداد الرسم البياني للأداء الدراسي
let myChart;

function updateChart() {
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    const labels = exams.map(exam => exam.name);
    const data = exams.map(exam => exam.percentage);
    
    if (myChart) {
        myChart.destroy();
    }
    
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'نسبة الامتحانات (%)',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// دالة لعرض بيانات الامتحانات في جدول إدارة البيانات
function displayExamsData() {
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    const examsTableBody = document.querySelector('#exams-data-table tbody');
    examsTableBody.innerHTML = '';
    
    exams.forEach((exam, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${exam.name}</td>
            <td>${exam.date}</td>
            <td>${exam.percentage}</td>
        `;
        
        examsTableBody.appendChild(row);
    });
}

// دالة لعرض بيانات الواجبات في جدول إدارة البيانات
function displayAssignmentsData() {
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const assignmentsTableBody = document.querySelector('#assignments-data-table tbody');
    assignmentsTableBody.innerHTML = '';
    
    assignments.forEach((assignment, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${assignment.serial || index + 1}</td>
            <td>${assignment.name}</td>
            <td>${assignment.number_of_questions || 'N/A'}</td>
            <td>${assignment.result || 'N/A'}</td>
            <td>${assignment.solved_questions || 'N/A'}</td>
            <td>${assignment.correct_questions || 'N/A'}</td>
            <td>${assignment.answers || 'N/A'}</td>
            <td>${assignment.start_time || 'N/A'}</td>
            <td>${assignment.end_time || 'N/A'}</td>
        `;
        
        assignmentsTableBody.appendChild(row);
    });
}

// دالة لتصدير البيانات
function exportData(type) {
    let data = [];
    let filename = '';
    
    if(type === 'exams') {
        data = JSON.parse(localStorage.getItem('exams')) || [];
        filename = 'exams_data.json';
    } else if(type === 'assignments') {
        data = JSON.parse(localStorage.getItem('assignments')) || [];
        filename = 'assignments_data.json';
    }
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// دالة لاستيراد البيانات مع تحويل الحقول العربية إلى الإنجليزية
// function importData(event, type) {
//     const file = event.target.files[0];
//     if(!file) return;
    
//     const reader = new FileReader();
//     reader.onload = function(e) {
//         try {
//             const importedData = JSON.parse(e.target.result);
//             if(type === 'exams') {
//                 const exams = JSON.parse(localStorage.getItem('exams')) || [];
//                 localStorage.setItem('exams', JSON.stringify([...exams, ...importedData]));
//                 displayExamsData();
//                 updateChart();
//                 alert('تم استيراد بيانات الامتحانات بنجاح!');
//             } else if(type === 'assignments') {
//                 const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
//                 importedData.forEach(item => {
//                     // التأكد من وجود الحقول المطلوبة
//                     if(item["اسم الواجب"] && item["وقت انهاء الواجب"]) {
//                         assignments.push({
//                             serial: item["التسلسل"],
//                             name: item["اسم الواجب"],
//                             number_of_questions: item["عدد الاسئلة"],
//                             result: item["النتيجة"],
//                             solved_questions: item["عدد الاسئلة المحلولة"],
//                             correct_questions: item["عدد الاسئلة الصحيحة"],
//                             answers: item["الاجابات"],
//                             start_time: item["وقت بدأ الواجب"],
//                             end_time: item["وقت انهاء الواجب"]
//                         });
//                     }
//                 });
//                 localStorage.setItem('assignments', JSON.stringify(assignments));
//                 displayAssignmentsData();
//                 displayAssignments(); // لتحديث العرض في جدول الواجبات الرئيسية
//                 alert('تم استيراد بيانات الواجبات بنجاح!');
//             }
//         } catch (error) {
//             alert('حدث خطأ أثناء استيراد البيانات. تأكد من أن الملف بتنسيق JSON صحيح.');
//             console.error(error);
//         }
//     };
//     reader.readAsText(file);
// }


function importData(event, type) { 
    const file = event.target.files[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if(type === 'exams') {
                const exams = JSON.parse(localStorage.getItem('exams')) || [];
                importedData.forEach(item => {
                    // التأكد من وجود الحقول المطلوبة
                    if(item["التسلسل"] && item["اسم الامتحان"] && item["عدد الاسئلة"] && item["النتيجة"]) {
                        exams.push({
                            serial: item["التسلسل"],
                            name: item["اسم الامتحان"],
                            number_of_questions: item["عدد الاسئلة"],
                            percentage: item["النتيجة"],
                            solved_questions: item["عدد الاسئلة المحلولة"],
                            correct_questions: item["عدد الاسئلة الصحيحة"],
                            answers: item["الاجابات"],
                            start_time: item["وقت بدأ الامتحان"],
                            date: item["وقت انهاء الامتحان"]
                        });
                    }
                });
                localStorage.setItem('exams', JSON.stringify(exams));
                displayExamsData(); // يجب أن تكون لديك دالة تعرض بيانات الامتحانات
                updateChart(); // إذا كان لديك مخطط مرتبط ببيانات الامتحانات
                alert('تم استيراد بيانات الامتحانات بنجاح!');
            } else if(type === 'assignments') {
                const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
                importedData.forEach(item => {
                    // التأكد من وجود الحقول المطلوبة
                    if(item["اسم الواجب"] && item["وقت انهاء الواجب"]) {
                        assignments.push({
                            serial: item["التسلسل"],
                            name: item["اسم الواجب"],
                            number_of_questions: item["عدد الاسئلة"],
                            result: item["النتيجة"],
                            solved_questions: item["عدد الاسئلة المحلولة"],
                            correct_questions: item["عدد الاسئلة الصحيحة"],
                            answers: item["الاجابات"],
                            start_time: item["وقت بدأ الواجب"],
                            end_time: item["وقت انهاء الواجب"]
                        });
                    }
                });
                localStorage.setItem('assignments', JSON.stringify(assignments));
                displayAssignmentsData(); // تحديث العرض في جدول الواجبات
                alert('تم استيراد بيانات الواجبات بنجاح!');
            }
        } catch (error) {
            alert('حدث خطأ أثناء استيراد البيانات. تأكد من أن الملف بتنسيق JSON صحيح.');
            console.error(error);
        }
    };
    reader.readAsText(file);
}
