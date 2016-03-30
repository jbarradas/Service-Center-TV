var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var DataBase = require('../database.json');


// HEADER SECTION
var Header = React.createClass({
    render: function() {
        return (
            <header>
                <ProjectLogo projects={DataBase} pos={this.props.pos}/>
                <GFIlogo imageSrc="img/gfi.jpg" />
                <time>
                    <Dates />
                    <Time />
                </time>
                <ProjectBar projects={DataBase} pos={this.props.pos} />
            </header>
        );
    }
});

// PRINT COMPANY LOGO
var ProjectLogo = React.createClass({
    render: function() {
        return (
            <img id="prjLogo" src={this.props.projects[this.props.pos].logo} />
        );
    }
});

// PRINT LOGO
var GFIlogo = React.createClass({
    render: function() {
        return (
            <img id="logo" src={this.props.imageSrc} key={this.props.imageSrc} />
        );
    }
});

// PRINT DATE AND TIME USING react-intl (FormatJS)
var IntlProvider  = ReactIntl.IntlProvider;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedTime = ReactIntl.FormattedTime;

var Dates = React.createClass({
    render: function () {
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

var Time = React.createClass({

    getInitialState: function () {
         return {smthing: 0}; 
    },

    componentDidMount: function () {
        setInterval(function() {
            this.setState({smthing: 1});
        }.bind(this), 500);
    },

    render: function () {
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

// PROJECT BAR
var ProjectBar = React.createClass({

    render: function() {
        return (
            <div className="bar">
                <ul>
                    <li>Project: {this.props.projects[this.props.pos].name} </li>
                    <li>Costumer: {this.props.projects[this.props.pos].costumer} </li>
                    <li>Country: {this.props.projects[this.props.pos].country} </li>
                </ul>
            </div>
        );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <main>
                <section className="mainGrid">
                    <div className="leftCol">
                        <div id="about" className="col-1-3">
                            <AboutTheProject projects={DataBase} pos={this.props.pos} />
                        </div>
                        <div id="team" className="col-1-3">
                            <Team projects={DataBase} pos={this.props.pos} />
                        </div>
                    </div>

                    <div className="rigthCol">
                        <ProjectStatus projects={DataBase} pos={this.props.pos} />
                        
                        
                    </div>
                </section>
            </main>
        );
    }
});


//ABOUT THE PROJECT BOX
var AboutTheProject = React.createClass({
  
  render: function() {
    return (
      <section className="abouttheproject">
        <h2>ABOUT THE PROJECT</h2>
        <section className="box1">
        <ul>
            <label>OBJECTIVE</label>
            {this.props.projects[this.props.pos].info.objective.map(function(item){return <li key={item}>{item}</li>;})}
            <label>MAIN FOCUS</label>
            {this.props.projects[this.props.pos].info.focus.map(function(item){return <li key={item}>{item}</li>;})}
        </ul>
        </section>

      </section>
    );
  }
});

//TEAM
var Team = React.createClass({
  
  render: function() {
    return (
        <section className="team">
            <h2>TEAM</h2>
            <section className="box">
                {this.props.projects[this.props.pos].team.map(function(item){
                    return <div className="boxcol-1-3" key={item[0]}>
                                <div className="content">
                                        <img className="perfil" src={item[1]} />
                                        <h5 className="perfilname">{item[0]}</h5>
                                </div>
                            </div>;
            })}
            </section>
        </section>
    );
  }
});

var ProjectStatus = React.createClass({

    render: function() {
        return (
            <section className="projectStatus">
                <h2>PROJECT STATUS</h2>
                    <div id="issues" className="col-1-2">
                        <IssueRisks projects={DataBase} pos={this.props.pos} />
                        <KeyDiscussionItems projects={DataBase} pos={this.props.pos} />
                    </div>
                    <div id="status" className="col-1-2">
                        <Status projects={DataBase} pos={this.props.pos} />
                    </div>
                </section>
            );
    }
});


//PROJECT STATUS BOX
var IssueRisks = React.createClass({

    render: function() {
        return (  
            <div className="content1">
                <ul>
                    <label>ISSUES/RISKS</label>
                    {this.props.projects[this.props.pos].about.issuesrisks.map(function(item){return <li key={item}>{item}</li>;})}
                </ul>
            </div> 
            );
    }
});

var KeyDiscussionItems = React.createClass({
    render: function(){
        return(
            <div className="content1">
                <ul>
                    <label>KEY DISCUSSION ITEMS</label>
                    {this.props.projects[this.props.pos].about.keydiscussionitms.map(function(item){return <li key={item}>{item}</li>;})}
                </ul>
            </div>
                    
            );
    }
});

var Status = React.createClass({

    render: function(){
        return(
            <div className="statusContent">
                <h5 className="statusText">{this.props.projects[this.props.pos].status.percent}</h5>
                <img className="imgstatus" src={this.props.projects[this.props.pos].status.img} />
            </div>
        );
    }

});


var All = React.createClass({
    
    getPositions: function () {
        if (this.state.position < this.props.db.length-1) {
            return (this.state.position)+1;
        } else {
            return 0;
        }

    },

    getInitialState: function () {
        return {position: 0};    
    },

    componentDidMount: function () {
        setInterval(function() {
            this.setState({position: this.getPositions()});
        }.bind(this), 2000);
    },
    
    render: function() {
        return (
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className="all">
                    <Header pos={this.state.position} key="header"/>
                    <Main pos={this.state.position} key="main"/>
            </div>
            </ReactCSSTransitionGroup>      
          

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
