import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../components/employee-form/employee-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../service/employee.service';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  empDetails!: FormGroup;
  empObj: Employee = new Employee();
  empList: Employee[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['employeeId', 'firstName', 'lastName', 'dob', 'gender', 'address','actions'];

  @ViewChild(MatSort) sort!: MatSort;

  editModalVisible = false;
  handleFormSubmission(formData: any) {
    // Formdan gelen verileri tabloya ekleyin
    this.dataSource.data.push(formData);
    // Tabloyu güncelleyin
    this.dataSource._updateChangeSubscription();
  }

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private empService: EmployeeService
  ) {
    this.dataSource = new MatTableDataSource<any>([
      { employeeId: 1, firstName: 'Mark', lastName: 'Otto', dob: new Date(1990, 1, 1), gender: 'Male', address: 'Bachelor' },
      { employeeId: 2, firstName: 'DOG', lastName: 'OttSo', dob: new Date(1990, 1, 2), gender: 'Male', address: 'BachelorR' }
    ]);
  }
  

  ngOnInit(): void {
    this.getAllEmployee();
    this.empDetails = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      dob: [''],
      gender: [''],
      address: [''],
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // deleteEmployee(element: any) {
  //   console.log('Silinen çalışan:', element);
  //   this.dataSource.data = this.dataSource.data.filter((e: any) => e !== element);
  // }

  openAddEditEmpForm() {
    this.dialog.open(EmployeeFormComponent);
  }

  closeEditForm() {
    this.editModalVisible = false;
  }

  addEmployee() {
    console.log(this.empDetails);
    this.empObj.id = this.empDetails.value.id;
    this.empObj.firstName = this.empDetails.value.firstName;
    this.empObj.lastName = this.empDetails.value.lastName;
    this.empObj.dob = this.empDetails.value.dob;
    this.empObj.gender = this.empDetails.value.gender;
    this.empObj.address = this.empDetails.value.address;

    this.empService.addEmployee(this.empObj).subscribe(
      (res: any) => {
        console.log(res);
        this.getAllEmployee();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(
      (res: any) => {
        this.empList = res;
      },
      (err: any) => {
        console.log("Error while fetching data.");
      }
    );
  }

  editEmployee(element: any) {
    this.empDetails.patchValue({
      id: element.employeeId,
      firstName: element.firstName,
      lastName: element.lastName,
      dob: element.dob,
      gender: element.gender,
      address: element.address
    });
  }
 

  updateEmployee() {
    this.empObj.id = this.empDetails.value.id;
    this.empObj.firstName = this.empDetails.value.firstName;
    this.empObj.lastName = this.empDetails.value.lastName;
    this.empObj.dob = this.empDetails.value.dob;
    this.empObj.gender = this.empDetails.value.gender;
    this.empObj.address = this.empDetails.value.address;

    let index = this.dataSource.data.findIndex((emp: any) => emp.employeeId === this.empObj.id);
    this.dataSource.data[index].firstName = this.empDetails.value.firstName;
    this.dataSource.data[index].lastName = this.empDetails.value.lastName;
    this.dataSource.data[index].dob = this.empDetails.value.dob;
    this.dataSource.data[index].gender = this.empDetails.value.gender;
    this.dataSource.data[index].address = this.empDetails.value.address;

    this.dataSource._updateChangeSubscription();

    this.empService.updateEmployee(this.empObj).subscribe(
      (res: any) => {
        console.log(res);
        this.getAllEmployee();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  deleteEmployee(emp: Employee) {
    this.empService.deleteEmployee(emp).subscribe(
      res => {
        console.log(res);
        alert('Employee deleted successfully');
        this.getAllEmployee();
      },
      err => {
        console.log(err);
      }
    );
  }
  
  


}
