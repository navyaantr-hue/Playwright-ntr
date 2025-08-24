pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/navyaantr-hue/Playwright-ntr.git'
            }
        }
        stage('Clean and Install') {
            steps {
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=junit,html --output=playwright-report --reporter=junit=results.xml'
            }
        }
        stage('Publish Reports') {
            steps {
                junit 'results.xml'
                publishHTML([reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report'])
            }
        }
    }
}