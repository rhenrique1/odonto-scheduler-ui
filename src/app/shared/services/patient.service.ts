import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { HttpClient } from '@angular/common/http';


//TODO: remove after adding http
const patients: Patient[] = [
  { id: 1, name: 'Mateus Gonçalves', email: "mateusxisd@hotmail.com", telephone: "(11) 97321-2349", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "220.457.566-61", notes: "O+" },
  { id: 2, name: 'Roberto Henrique', email: "roberto@hotmail.com", telephone: "(14) 98640-8333", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "911.223.233-52", notes: "A" },
  { id: 3, name: 'Rafael Rodrigues', email: "rafael@hotmail.com", telephone: "(13) 96780-6195", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "772.324.424-08", notes: "B" },
  { id: 4, name: 'Tomas Edson', email: "tomas@hotmail.com", telephone: "(13) 96780-6195", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "333.882.754-75", notes: "AB" },
  { id: 5, name: 'Lucas Ribino', email: "lucas@hotmail.com", telephone: "(13) 98157-0164", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "362.182.490-18", notes: "O-" },
  { id: 6, name: 'Michel Guilhen', email: "michel@hotmail.com", telephone: "(12) 98669-8611", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "362.182.490-18", notes: "A" },
  { id: 7, name: 'Branderson Lima', email: "branderson@hotmail.com", telephone: "(16) 97267-7817", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "359.544.858-87", notes: "O+" },
  { id: 8, name: 'João Lucas', email: "jao@hotmail.com", telephone: "(16) 98005-2204", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "827.614.389-06", notes: "O-+" },
  { id: 9, name: 'Paulo César', email: "paulinho@hotmail.com", telephone: "(15) 99864-0231", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "548.655.354-46", notes: "B" },
  { id: 10, name: 'Vitor de Jesus', email: "vitinho@hotmail.com", telephone: "(13) 97578-7022", address: "Rua dos Bobos, 0, Sorocaba-SP", gender: "Masculino", cpf: "548.655.354-46", notes: "A" },
];

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly url: string = '';

  constructor(private http: HttpClient) { }

  public getPatients(): Patient[] {
    // return this.http.get<Patient[]>(this.url);
    return patients;
  }

  public getPatient(patientId: number): Patient {

    // return this.http.get<Patient>(this.url + '/' + patientId);
    let patient = patients.find(x => x.id == patientId);

    //TODO: implement better fix later
    if (patient === undefined) {
      return patients[0];
    }

    return patient;
  }

  public createPatient(patient: Patient): boolean {
    //TODO: add actual HTTP communication 
    // return this.http.post<Patient>(this.url, patient);
    return true;
  }

  public updatePatient(patient: Patient): boolean {
    //TODO: add actual HTtP communication 
    //TODO: confirm if sending the id separately is a better practice
    // return this.http.put<Patient>(this.url, patient);
    return true;
  }
}
