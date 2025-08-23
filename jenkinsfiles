pipeline {
    agent any

    tools {
        nodejs "Node18"  // Make sure Node.js 18 is installed in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pull code from your Git repo
                git branch: 'main', url: 'https://github.com/navyaantr-hue/Playwright-ntr.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run tests in headless mode
                sh 'npx playwright test --reporter=html'
            }
        }

        stage('Archive Test Report') {
            steps {
                // Publish Playwright HTML report in Jenkins
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}