//****************************************************************************************
class MyCourse extends React.Component {
   constructor(props) {
      super(props)

      // we will change from spans to inputs when editing is true
      this.state = {
         editing: false,
      }
   }

   // use the fat arrow notation so that "this" mean the object of this class
   editCourse = () => {
      this.setState({ editing: true })
      alert("edit course");
   }

   removeCourse = () => {
      alert("remove course");
      this.props.removeProperty(this.props.index);
      //a component's removeProperty attribute connects to the parent's (roster's) function rosterRemoveCourseFunction
   }

   saveCourse = () => {
      this.setState({ editing: false })
      alert("save course");
      alert(this.refs.teacher.value);
      var myCourse = { courseNo: "XXX", teacher: "YYY", dayTime: "ZZZ" };
      myCourse.courseNo = this.refs.courseNo.value;
      myCourse.teacher = this.refs.teacher.value;
      myCourse.dayTime = this.refs.dayTime.value;
      this.props.editProperty(this.props.index, myCourse);
      //a component's editProperty attribute connects to the parent's (roster's) function rosterEditCourseFunction
   }
   render() {
      if (this.state.editing) {
         return (
            <div>
               <input ref="courseNo" type="text" className="fixed changing" defaultValue={this.props.courseNo} />
               <input ref="teacher" type="text" className="fixed changing" defaultValue={this.props.teacher} />
               <input ref="dayTime" type="text" className="fixed changing" defaultValue={this.props.dayTime} />
               <input type="button" value="Save" onClick={this.saveCourse} />
            </div>
         )

      }
      else {
         return (
            <div>
               <span className="fixed">{this.props.courseNo}</span>
               <span className="fixed">{this.props.teacher}</span>
               <span className="fixed">{this.props.dayTime}</span>
               <input type="button" value="Edit" onClick={this.editCourse} />
               <input type="button" value="Remove" onClick={this.removeCourse} />
            </div>
         )
      }

   }
};  //end MyCourse

class MyRoster extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         courses: [
            { courseNo: "CSC 341", teacher: "Blum", dayTime: "MW 12:30" },
            { courseNo: "CSC 381", teacher: "Redmond", dayTime: "MW 2:00" },
            { courseNo: "CSIT 440", teacher: "McCoey", dayTime: "TR 2:00" }
         ]
      }
   }

   rosterRemoveCourseFunction = (i) => {
      console.log("removing");
      let courseArrayCopy = this.state.courses;
      courseArrayCopy.splice(i, 1);
      this.setState({ courses: courseArrayCopy });
   }

   rosterEditCourseFunction = (i, newInfo) => {
      console.log("editing");
      var courseArrayCopy = this.state.courses;
      courseArrayCopy[i] = newInfo;
      this.setState({ courses: courseArrayCopy });
   }

   eachCourse = (item, i) => {
      //when I did not pull out eachCourse from the map-iteration there was confusion about this.rosterRemoveCourseFunction
      return <MyCourse key={i} index={i}
         courseNo={item.courseNo}
         teacher={item.teacher}
         dayTime={item.dayTime}
         removeProperty={this.rosterRemoveCourseFunction}
         editProperty={this.rosterEditCourseFunction}
      />;
   }

   render() {
      //pull out map iteration code into a named function eachCourse 
      return (
         <div>
            {this.state.courses.map(this.eachCourse)}
         </div>
      )
   }

}; //end MyRoster

// call the render method  -- only one parent can be rendered -- so add surrounding div
ReactDOM.render(
   <div>
      <MyRoster />
   </div>,
   document.getElementById('divTarget'));