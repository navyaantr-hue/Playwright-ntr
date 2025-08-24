pipeline {
    agent any

    tools {
        nodejs "NodeJS-18" // Replace with the NodeJS name in Jenkins → Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/navyaantr-hue/Playwright-ntr.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'rm -rf node_modules playwright-report test-results'
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Discover Tests') {
            steps {
                echo "Discovering all tests before execution..."
                // --list gives you all the tests detected without running them
                sh 'npx playwright test --list'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Generate JUnit XML and HTML reports
                sh 'npx playwright test --reporter=junit=test-results/results.xml --reporter=html=playwright-report'
            }
        }

        stage('Publish Reports') {
            steps {
                // Publish JUnit test results
                junit 'test-results/results.xml'

                // Publish Playwright HTML report
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }
    }

    post {
        always {
            echo "Pipeline completed. Check test reports for full details."
        }
    }
}