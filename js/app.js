var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');



var testDB = [
    {
        id: 1,
        name: "Company Hub",
        costumer: "GFI Informatique",
        country: "France",
        team: {
            total: 6,
            people: {
                people1: {
                    name: "Vitor Pereira",
                    foto: "img/FotosPerfil/VitorPereira.png"
                },
                people2: {
                    name: "Pedro Conde",
                    foto: "img/FotosPerfil/PedroConde.png"
                },
                people3: {
                    name: "Rui Almeida",
                    foto: "img/FotosPerfil/RuiAlmeida.png"
                },
                people4: {
                    name: "Tiago Flores",
                    foto: "img/FotosPerfil/TiagoFlores.png"
                },
                people5: {
                    name: "Ivo Ventura",
                    foto: "img/FotosPerfil/IvoVentura.png"
                },
                people6: {
                    name: "Hugo Antunes",
                    foto: "img/FotosPerfil/HugoAntunes.png"
                }
            }
        },
        info: {
            objective: "Mobile multi-platform portal to display and interact with data from enterprise systems",
            focus: "Push Notifications and External Auth."
        },
        about: {
            issuesrisks: {
                            one: "Not enough mobile phones o fully test all circunstances",
                            two: "One man short on Android"
            },
            keydiscussionitms: "Planning of industrialization and support must be defined"
        },
        status:{
            percent: "Ongoing Product",
            img: "img/status/state-yellow.png"
        }
    },
    {
        id: 2,
        name: "MOCCA+",
        costumer: "Crédit Agricole",
        country: "France",
        team: {
            total: 3,
            people: {
                people1: {
                name: "Luis Alves",
                foto: ""                    
                },
                people2: {
                name: "Ana Lopes",
                foto: ""
                },
                people3: {
                    name: "Jorge Graça",
                    foto: ""
                }
            }
        },
        info: {
            objective: "Technical migration from Vignette to Sharepoint 2013.",
            focus: "Migration of 60 intranets"
        },
        about: {
            issuesrisks: {
                            one: "issues risks one",
                            two: "issues risks two"
            },
            keydiscussionitms: "keydiscussionitms"
        },
        status:{
            percent: "DONE",
            img: "img/status/state-green.png"
        }
    }
]

// HEADER SECTION
var Header = React.createClass({
    render: function() {
        return (
            <header>
                <ProjectLogo />
                <GFIlogo imageSrc="img/gfi.jpg" />
                <time>
                    <Dates />
                    <Time />
                </time>
                <ProjectBar projects={testDB} pos={this.props.pos} />
            </header>
        );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <main>
                <section className="mainGrid">
                    <div className="leftCol">
                        <div className="col-1-3">
                            <AboutTheProject projects={testDB} pos={this.props.pos} />
                        </div>
                        <div className="col-1-3">
                            <Team projects={testDB} pos={this.props.pos} />
                        </div>
                    </div>

                    <div className="rigthCol">
                        <ProjectStatus projects={testDB} pos={this.props.pos} />
                        
                        
                    </div>
                </section>
            </main>
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

// PRINT COMPANY LOGO
var ProjectLogo = React.createClass({
    render: function() {
        return (
            <img id="prjLogo" src="img/logo-company-hub.png" />
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

//ABOUT THE PROJECT BOX
var AboutTheProject = React.createClass({
  
  render: function() {
    return (
      <section className="abouttheproject">
        <h2>ABOUT THE PROJECT</h2>
        <section className="box1">
        <ul>
            <label>OBJECTIVE</label>
            <li>{this.props.projects[this.props.pos].info.objective}</li>
            <label>MAIN FOCUS</label>
            <li>{this.props.projects[this.props.pos].info.focus}</li>
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
                <div className="boxcol-1-3">
                     <div className="content">
                         <img className="perfil" src={this.props.projects[0].team.people.people1.foto}/>
                         <h5 className="perfilname"> {this.props.projects[0].team.people.people1.name}</h5>
                    </div>
                </div>
                <div className="boxcol-1-3">
                    <div className="content">
                       <img className="perfil" src={this.props.projects[0].team.people.people2.foto}/>
                       <h5 className="perfilname"> {this.props.projects[0].team.people.people2.name}</h5>
                    </div>
                </div>
                <div className="boxcol-1-3">
                    <div className="content">
                       <img className="perfil" src={this.props.projects[0].team.people.people3.foto}/>
                       <h5 className="perfilname"> {this.props.projects[0].team.people.people3.name}</h5>
                   </div>
                </div>
                <div className="boxcol-1-3">
                    <div className="content">
                        <img className="perfil" src={this.props.projects[0].team.people.people4.foto}/>
                        <h5 className="perfilname"> {this.props.projects[0].team.people.people4.name}</h5>
                    </div>
                </div>
                <div className="boxcol-1-3">
                    <div className="content">
                        <img className="perfil" src={this.props.projects[0].team.people.people5.foto}/>
                        <h5 className="perfilname"> {this.props.projects[0].team.people.people5.name}</h5>
                    </div>
                </div>
                <div className="boxcol-1-3">
                    <div className="content">
                        <img className="perfil" src={this.props.projects[0].team.people.people6.foto}/>
                        <h5 className="perfilname"> {this.props.projects[0].team.people.people6.name}</h5>
                    </div>
                </div>
            </section>
        </section>
    );
  }
});

var ProjectStatus = React.createClass({

    render: function() {
        return (
            <section className = "projectStatus">
                <h2>PROJECT STATUS</h2>
                    <div className="col-1-2">
                        <IssueRisks projects={testDB} pos={this.props.pos} />
                        <KeyDiscussionItems projects={testDB} pos={this.props.pos} />
                    </div>
                    <div className="col-1-2">
                        <Status projects={testDB} pos={this.props.pos} />
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
                    <li>{this.props.projects[this.props.pos].about.issuesrisks.one}</li>
                    <li>{this.props.projects[this.props.pos].about.issuesrisks.two}</li>
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
                    <li>{this.props.projects[this.props.pos].about.keydiscussionitms}</li>
                </ul>
            </div>
                    
            );
    }
});

var Status = React.createClass({

    render: function(){
        return(
            <div className="content">
                <img className="imgstatus" src={this.props.projects[this.props.pos].status.img} />
                <h5 className="statusText">{this.props.projects[this.props.pos].status.percent}</h5>
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
            
            <div className="all">
                    <Header pos={this.state.position} />
                    <Main pos={this.state.position} />
            </div>
                  
          

        );
    }
});



// RENDER TO VIRTUAL DOM
  ReactDOM.render(
    
            <IntlProvider>
                <All db={testDB} />
            </IntlProvider>,
            document.getElementById('main')
   
  );
