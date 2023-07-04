import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  empDetail !: FormGroup;
  empObj: Employee = new Employee();
  empList:Employee[]=[];
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    private formBuilder: FormBuilder,
    private empService: EmployeeService
  ) {
    this.getAllEmployee();
    this.empDetail = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      address: [''],
      gender:['']
      
    });
  }
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
  cancelDialog() {
    this.dialogRef.close();
  }

  saveForm() {
    // Formun kaydedilmesi işlemleri
    console.log(this.empDetail);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.firstName = this.empDetail.value.firstName;
    this.empObj.lastName = this.empDetail.value.lastName;
    this.empObj.dob = this.empDetail.value.dob;
    this.empObj.gender = this.empDetail.value.gender;
    this.empObj.address = this.empDetail.value.address;
    
    // Yeni çalışanı ekleyin
    this.empService.addEmployee(this.empObj).subscribe(res => {
      console.log(res)
      // Tüm çalışanları getirin
      this.getAllEmployee();
    }, (err) => {
      console.log(err)
    })
    

  }
  submitForm() {
    // Form verilerini alın
    const empData = this.empDetail.value;
    // Verileri istediğiniz şekilde işleyin
    console.log(empData);
    // customer.component.ts dosyasındaki fonksiyonu çağırın
    this.formData.emit(empData);
    
    // Formu sıfırlayın
    this.empDetail.reset();
  }


  // onFormSubmit() {
  //   if (this.empDetail.valid) {
  //     console.log(this.empDetail.value);
  //   }
  // }
  getAllEmployee(){
    // Tüm çalışanları getirin
    this.empService.getAllEmployee().subscribe(res => {
      console.log(res)
      // Tabloyu güncelleyin
      this.dataSource.data = res;
      this.dataSource._updateChangeSubscription();
      
    }, (err) => {
      console.log("error while fetching data")
    })
    
  }
  // deleteEmployee(emp: Employee) {
  //   this.empService.deleteEmployee(emp).subscribe(
  //     res => {
  //       console.log(res);
  //       alert('Employee deleted successfully');
  //       this.getAllEmployee();
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  

}
