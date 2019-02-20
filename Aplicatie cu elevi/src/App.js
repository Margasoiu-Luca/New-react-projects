import React, { Component } from "react";
import "./App.css";

class Elev extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.id}>
        <p className="ElevCriteriu">{this.props.nume}</p>
        <p className="ElevCriteriu">{this.props.prenume}</p>
        <p className="ElevCriteriu">{this.props.varsta}</p>
        <p className="ElevCriteriu">{this.props.medie}</p>
        <button className="ButonStergere" onClick={this.props.StergereStudent}>
          Sterge
        </button>
      </div>
    );
  }
}

class Grupa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          nume: "Cristian",
          prenume: "Andronescu",
          varsta: 20,
          media: 8.2
        },
        {
          nume: "Andreea",
          prenume: "Mihalache",
          varsta: 18,
          media: 7.3
        },
        {
          nume: "Vasilescu",
          prenume: "Nicolae",
          varsta: 13,
          media: 8.4
        },
        {
          nume: "Stanescu",
          prenume: "Ion",
          varsta: 25,
          media: 6.4
        },
        {
          nume: "Veghea",
          prenume: "Marin",
          varsta: 30,
          media: 9.8
        },
        {
          nume: "Cebanu",
          prenume: "Mihaela",
          varsta: 11,
          media: 9.4
        }
      ],

      //datele studentului temporar introdus in inputuri
      temp_student_nume: "",
      temp_student_prenume: "",
      temp_student_varsta: null,
      temp_student_media: null,

      //aceste doua variabile tin cont de tipul de sorare curenta, descrescatoare si respectiv crescatoare
      sorted_situation_medie: 0,
      sorted_situation_varsta: 0
    };
    this.sort_function_medie = this.sort_function_medie.bind(this);
    this.sort_function_varsta = this.sort_function_varsta.bind(this);
    this.keypress1 = this.keypress1.bind(this);
    this.keypress2 = this.keypress2.bind(this);
    this.keypress3 = this.keypress3.bind(this);
    this.keypress4 = this.keypress4.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.StergereStudent = this.StergereStudent.bind(this);
  }

  //funcita de sortare dupa medie
  sort_function_medie(ev) {
    if (
      this.state.sorted_situation_medie === 0 ||
      this.state.sorted_situation_medie === -1
    ) {
      this.setState({
        students: this.state.students.sort((a, b) => {
          if (a.media < b.media) return 1;
          else if (a.media > b.media) return -1;
          return 0;
        }),
        sorted_situation_medie: (this.state.sorted_situation_medie = 1)
      });
    } else if (this.state.sorted_situation_medie === 1) {
      this.setState({
        students: this.state.students.sort((a, b) => {
          if (a.media > b.media) return 1;
          else if (a.media < b.media) return -1;
          return 0;
        }),
        sorted_situation_medie: (this.state.sorted_situation_medie = -1)
      });
    }
  }

  //functia de sortare dupa varsta
  sort_function_varsta(ev) {
    if (
      this.state.sorted_situation_varsta === 0 ||
      this.state.sorted_situation_varsta === -1
    ) {
      this.setState({
        students: this.state.students.sort((a, b) => {
          if (a.varsta < b.varsta) return 1;
          else if (a.varsta > b.varsta) return -1;
          return 0;
        }),
        sorted_situation_varsta: (this.state.sorted_situation_varsta = 1)
      });
    } else if (this.state.sorted_situation_varsta === 1) {
      this.setState({
        students: this.state.students.sort((a, b) => {
          if (a.varsta > b.varsta) return 1;
          else if (a.varsta < b.varsta) return -1;
          return 0;
        }),
        sorted_situation_varsta: (this.state.sorted_situation_varsta = -1)
      });
    }
  }

  //functiile care actualizeaza temp student
  keypress1(ev) {
    this.setState({
      temp_student_nume: (this.state.temp_student_nume = ev.target.value)
    });
  }
  keypress2(ev) {
    this.setState({
      temp_student_prenume: (this.state.temp_student_prenume = ev.target.value)
    });
  }
  keypress3(ev) {
    this.setState({
      temp_student_varsta: (this.state.temp_student_varsta = ev.target.value)
    });
  }
  keypress4(ev) {
    this.setState({
      temp_student_media: (this.state.temp_student_media = ev.target.value)
    });
  }

  addStudent(ev) {
    if (
      this.state.temp_student_nume.length == "" ||
      this.state.temp_student_prenume.length == "" ||
      isNaN(parseInt(this.state.temp_student_media)) == 1 ||
      isNaN(parseFloat(this.state.temp_student_varsta)) == 1
    )
      alert("trebuie sa completati toate campurile corect");
    else {
      var temp_student = {};
      temp_student["nume"] = this.state.temp_student_nume;
      temp_student["prenume"] = this.state.temp_student_prenume;
      temp_student["varsta"] = this.state.temp_student_varsta;
      temp_student["media"] = this.state.temp_student_media;
      var tempCopy = this.state.students;
      tempCopy = [...tempCopy, temp_student];
      document.getElementById("input1").value = "";
      document.getElementById("input2").value = "";
      document.getElementById("input3").value = "";
      document.getElementById("input4").value = "";
      this.setState({
        students: (this.state.students = tempCopy)
      });
    }
  }

  StergereStudent(ev) {
    // ev.target.parentElement.id
    var tempCopy = this.state.students;
    console.dir(tempCopy);
    var nodes = Array.from(
      ev.target.parentElement.parentElement.parentElement.childNodes
    );
    var x = nodes.findIndex(
      index => index.firstElementChild === ev.target.parentElement
    );
    tempCopy.splice(x - 4, 1);
    console.dir(tempCopy);
    this.setState({
      students: (this.state.students = tempCopy)
    });
  }

  render() {
    return (
      <div>
        <p className="TableHeader">Nume</p>
        <p className="TableHeader">Prenume</p>
        <p className="TableHeader" onClick={this.sort_function_varsta}>
          Varsta
        </p>
        <p className="TableHeader" onClick={this.sort_function_medie}>
          Medie
        </p>
        {this.state.students.map(index => {
          return (
            <div>
              <Elev
                nume={index.nume}
                prenume={index.prenume}
                varsta={index.varsta}
                medie={index.media}
                id={index.id}
                StergereStudent={this.StergereStudent}
              />
            </div>
          );
        })}
        <input
          id="input1"
          type="text"
          className="input_bottom"
          placeholder="Introduceti numele"
          onKeyUp={this.keypress1}
        />
        <input
          id="input2"
          type="text"
          className="input_bottom"
          placeholder="Introduceti prenumele"
          onKeyUp={this.keypress2}
        />
        <input
          id="input3"
          type="text"
          className="input_bottom"
          placeholder="Introduceti varsta"
          onKeyUp={this.keypress3}
        />
        <input
          id="input4"
          type="text"
          className="input_bottom"
          placeholder="Introduceti media"
          onKeyUp={this.keypress4}
        />
        <button id="AddButton" onClick={this.addStudent}>
          adauga persoana
        </button>
      </div>
    );
  }
}

export default Grupa;
