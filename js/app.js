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
                <GFIlogo imageSrc="img/gfi.jpg" />
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
            <img id="logo" src={this.props.imageSrc} key={this.props.imageSrc} />
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
                    <li>Country: {this.props.projects[this.props.page].country} </li>
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
                    <div className="leftCol">
                        <div id="about" className="col-1-3">
                            <AboutTheProject projects={DataBase} page={this.props.page} />
                        </div>
                        <div id="team" className="col-1-3">
                            <Team projects={DataBase} page={this.props.page} />
                        </div>
                    </div>
                    <div className="rigthCol">
                        <ProjectStatus projects={DataBase} page={this.props.page} />
                    </div>
            </main>
        );
    }
});

// ABOUT THE PROJECT BOX (Objectives + Main focuses)
var AboutTheProject = React.createClass({
  render: function() {
    return (
      <section className="abouttheproject">
        <div className="buttons-color">
            <div className="but-color-medium aboutbar">
                <span className="but-icon"></span>ABOUT THE PROJECT
            </div>
        </div>
        <section className="box1">
            <ul>
                <label>OBJECTIVE</label>
                {this.props.projects[this.props.page].info.objective.map(function(item){
                    return <li key={item}>{item}</li>;
                })}
                <label>MAIN FOCUS</label>
                {this.props.projects[this.props.page].info.focus.map(function(item){
                    return <li key={item}>{item}</li>;
                })}
            </ul>
        </section>
      </section>
    );
  }
});

// PRINT TEAM MEMBERS (Profile Photos)
var Team = React.createClass({
  render: function() {
    return (
        <section className="team">
            <div className="buttons-color">
                <div className="but-color-medium teambar">
                    <span className="but-icon"></span>TEAM
                </div>
            </div>
            <section className="box">
                {this.props.projects[this.props.page].team.map(function(item){
                    return <div className="boxcol-1-3" key={item[0]} >
                                <div className="content">
                                        <img className="perfil" src={item[1]} />
                                        <h5 className="perfilname"> {item[0]} </h5>
                                </div>
                            </div>;
                })}
            </section>
        </section>
    );
  }
});

// PROJECT STATUS BOX (Issues/Risks + Key Discussion Items + Status Meter)
var ProjectStatus = React.createClass({
    render: function() {
        return (
            <section className="projectStatus">
                <div className="buttons-color">
                    <div className="but-color-medium  statusbar">
                        <span className="but-icon"></span>PROJECT STATUS
                    </div>
                </div>
                    <div id="issues" className="col-1-2">
                        <IssueRisks projects={DataBase} page={this.props.page} />
                        <KeyDiscussionItems projects={DataBase} page={this.props.page} />
                    </div>
                    <div id="status" className="col-1-2">
                        <Status projects={DataBase} page={this.props.page} />
                    </div>
                </section>
            );
    }
});

// PRINT ISSUES AND RISKS
var IssueRisks = React.createClass({
    render: function() {
        return (  
            <div className="content1">
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
            <div className="content1">
                <ul>
                    <label>KEY DISCUSSION ITEMS</label>
                    {this.props.projects[this.props.page].about.keydiscussionitms.map(function(item){return <li key={item}>{item}</li>;})}
                </ul>
            </div>   
        );
    }
});

// PRINT STATUS METER
var Status = React.createClass({
    render: function(){
        return(
            <div className="statusContent">
                <h5 className="statusText">{this.props.projects[this.props.page].status.percent}</h5>
                <img className="imgstatus" src={this.props.projects[this.props.page].status.img} />
            </div>
        );
    }
});


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
        setInterval(function() {
            this.setState({page: this.getPages()});
        }.bind(this), 500);
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
