pipeline {
    agent any

    tools {
        nodejs "NodeJS-18"   // Ensure NodeJS-18 is added in Jenkins → Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pull code from GitHub
                git branch: 'main', url: 'https://github.com/navyaantr-hue/Playwright-ntr.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Clean & Install packages + Playwright browsers
                sh 'rm -rf node_modules playwright-report results.xml'
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run tests with both HTML + JUnit reporters
                sh 'npx playwright test --reporter=junit,html'
            }
        }

        stage('Publish Reports') {
            steps {
                // Publish HTML report on Jenkins
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])

                // Publish JUnit report for Jenkins test results
                junit 'results.xml'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed. Check reports for details.'
        }
    }
}