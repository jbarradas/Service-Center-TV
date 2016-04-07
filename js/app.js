var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var DataBase = require('../database.json');
var IntlProvider = ReactIntl.IntlProvider;

var onresize = function() 
{
   var width = window.innerWidth
   || document.documentElement.clientWidth
   || document.body.clientWidth;
   console.log(width);
}

/*----------------------------*
*                             *
*       HEADER SECTION        *
*                             *
*----------------------------*/

// HEADER COMPONENT (Calls: ProjectLogo, GFILogo, Time/Date, ProjectBar)
var Header = React.createClass({
    render: function() {
        return (
            <header>
                <ProjectLogo projects={DataBase} page={this.props.page}/>
                <GFIlogo imageSrc="img/gfi.svg" />
                <time>
                    <Dates />
                    <Time />
                </time>
                <ProjectBar projects={DataBase} page={this.props.page} />
            </header>
        );
    }
});

// PRINT PROJECT LOGO
var ProjectLogo = React.createClass({
    render: function() {
        return (
            <img id="prjLogo" src={this.props.projects[this.props.page].logo} />
        );
    }
});

// PRINT GFI LOGO
var GFIlogo = React.createClass({
    render: function() {
        return (
            <div id="logo">
                <img src={this.props.imageSrc} key={this.props.imageSrc} />
            </div>
        );
    }
});

// PRINT TIME AND DATE USING react-intl (FormatJS)
var Time = React.createClass({

    getInitialState: function () {
         return {clock: 0}; 
    },

    componentDidMount: function () {
        setInterval(function() {
            this.setState({clock: 1});
        }.bind(this), 500);
    },

    render: function () {
        var FormattedTime = ReactIntl.FormattedTime;
        
        return (
            <FormattedTime 
                value={new Date()}
                hour="numeric"
                minute="numeric"
                second="numeric"
            />
        );
    }
});

var Dates = React.createClass({
    render: function () {
        var FormattedDate = ReactIntl.FormattedDate;
        
        return (
            <FormattedDate
                value={new Date()}
                weekday="long"
                day="numeric"
                month="long"
                year="numeric" /> 
        );
    }
});

// PROJECT INFO BAR (Name, Costumer, Country)
var ProjectBar = React.createClass({
    render: function() {
        return (
            <div className="bar">
                <ul>
                    <li>Project: {this.props.projects[this.props.page].name} </li>
                    <li>Costumer: {this.props.projects[this.props.page].costumer} </li>
                    <li> <img id="flag" src={this.props.projects[this.props.page].country[0]} /> {this.props.projects[this.props.page].country[1]} </li>
                </ul>
            </div>
        );
    }
});


/*----------------------------*
*                             *
*        MAIN SECTION         *
*                             *
*----------------------------*/

// MAIN COMPONENT (Calls: )
var Main = React.createClass({
    render: function() {
        return (
            <main className="mainGrid">
                <About projects={DataBase} page={this.props.page} />
                <Status projects={DataBase} page={this.props.page} />
                <Team projects={DataBase} page={this.props.page} />
            </main>
        );
    }
});

// ABOUT THE PROJECT BOX (Objectives + Main focuses)
var About = React.createClass({
  render: function() {
    return (
        <section className="about buttons-color">
            <div className="title but-color-medium">
                <span className="but-icon"></span>ABOUT THE PROJECT
            </div>
            <div className="aboutContent">
                <ul>
                    <label>OBJECTIVE</label>
                    {this.props.projects[this.props.page].info.objective.map(function(item){
                        return <li key={item}>{item}</li>;
                    })}
                </ul>
                <ul>
                    <label>MAIN FOCUS</label>
                    {this.props.projects[this.props.page].info.focus.map(function(item){
                        return <li key={item}>{item}</li>;
                    })}
                </ul>
            </div>
        </section>
    );
  }
});

// PROJECT STATUS BOX (Issues/Risks + Key Discussion Items + Status Meter)
var Status = React.createClass({
    render: function() {
        return (
            <section className="status buttons-color">
                <div className="title but-color-medium">
                    <span className="but-icon"></span>PROJECT STATUS
                </div>
                <div className="statusContent">
                    <IssueRisks projects={DataBase} page={this.props.page} />
                    <KeyDiscussionItems projects={DataBase} page={this.props.page} />
                    <Progress projects={DataBase} page={this.props.page} />
                </div>
            </section>
        );
    }
});

// PRINT TEAM MEMBERS (Profile Photos)
var Team = React.createClass({
    render: function() {
        return (
            <section className="team buttons-color">
                <div className="title but-color-medium">
                    <span className="but-icon"></span>TEAM
                </div>
                <div className="teamContent">
                    {this.props.projects[this.props.page].team.map(function(item){
                        return <div key={item[0]+item[1]} >
                                    <img className="profilePic" src={item[2]} />
                                    <h5 className="profileFirstName"> {item[0]} </h5>
                                    <h5 className="profileLastName"> {item[1]} </h5>
                                </div>;
                    })}
                </div>
            </section>
        );
    }
});


// PRINT ISSUES AND RISKS
var IssueRisks = React.createClass({
    render: function() {
        return (  
            <div className="issues">
                <ul>
                    <label>ISSUES/RISKS</label>
                    {this.props.projects[this.props.page].about.issuesrisks.map(function(item){
                        return <li key={item}>{item}</li>;
                    })}
                </ul>
            </div> 
        );
    }
});

// PRINT KEY DISCUSSION ITEMS
var KeyDiscussionItems = React.createClass({
    render: function(){
        return(
            <div className="keyItems">
                <ul>
                    <label>KEY DISCUSSION ITEMS</label>
                    {this.props.projects[this.props.page].about.keydiscussionitms.map(function(item){return <li key={item}>{item}</li>;})}
                </ul>
            </div>   
        );
    }
});

// PRINT STATUS METER
var Progress = React.createClass({
    render: function(){
        var percent = this.props.projects[this.props.page].status.percent;
        return(
            <div className="progress">
                <div id="bar-1" className="bar-main-container white">
                    <div className="wrap">
                        <div id="bar-percentage" className="bar-percentage" data-percentage={percent}></div>
                        <div className="bar-container">
                            <div id="meter" className="meter">
                                <span id="spanMeter"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
});

// <h5>{this.props.projects[this.props.page].status.percent}</h5> 

/*----------------------------*
*                             *
*     FULL PAGE SECTION       *
*                             *
*----------------------------*/

// FULL PAGE CONTAINER (Calls: Header + Main Components)
var All = React.createClass({

    getPages: function () {
        if (this.state.page < this.props.db.length-1) {
            return (this.state.page)+1;
        } else {
            return 0;
        }
    },

    addFadeClass: function () {
        document.getElementById('all').className = "all fade";
    },

    removeFadeClass: function () {
        document.getElementById('all').className = "all";
    },

    getInitialState: function () {
        return {page: 0};    
    },

    componentWillMount: function () {
        setTimeout(function() {
            this.addFadeClass();
        }.bind(this), 4000);
    },

    componentDidMount: function () {
        // setInterval(function() {
            this.setState({page: this.getPages()});
       // }.bind(this), 500);
    },

    componentDidUpdate: function () {
        setTimeout(function() {
            this.removeFadeClass();
        }.bind(this), 1000);
        setTimeout(function() {
            this.addFadeClass();
        }.bind(this), 4000);
    },
    
    render: function() {
        return (
            <div className="all" id="all">
                <Header page={this.state.page} key="header"/>
                <Main page={this.state.page} key="main"/>
                {onresize()}
            </div>
        );
    }
});

// RENDER TO VIRTUAL DOM
ReactDOM.render(
    <IntlProvider>
        <All db={DataBase} />
    </IntlProvider>,
    document.getElementById('main')
);

