'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');

module.exports = class extends Generator {
  prompting() {

		this.log(
      yosay(`Welcome to the ${chalk.red('generator-restful-vue-bulma')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name',
        default: 'My Super Project'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
		this.fs.copy(this.templatePath(), this.destinationPath(), {
      globOptions: { dot: true }
    });
		let properties = { 
			projectName: this.props.projectName,
			projectNameTitleCase: changeCase.titleCase(this.props.projectName),
			projectNameSnakeCase: changeCase.snakeCase(this.props.projectName)
		}
		let siht = this;
		function ctpl(tplname) {
    	siht.fs.copyTpl(
				siht.templatePath(tplname),
				siht.destinationPath(tplname),
				properties
			);
		}
		ctpl('package.json');
		ctpl('README.md');
		ctpl('public/index.html');
  }

  install() {
    if (this.options['skip-install']) {
      return;
    }

		this.spawnCommand('npm', ['install']);
  }
};
