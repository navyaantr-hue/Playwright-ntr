pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/navyaantr-hue/Playwright-ntr.git'
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
                sh 'npx playwright test --reporter=junit,test-results/junit-results.xml,html'
            }
        }
        stage('Publish Reports') {
            steps {
                junit 'test-results/junit-results.xml'
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true,
                    reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report'])
            }
        }
    }
}