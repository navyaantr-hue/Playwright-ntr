pipeline {
    agent any

    tools {
        nodejs "NodeJS-18"  // Ensure NodeJS-18 is installed in Jenkins → Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/navyaantr-hue/Playwright-ntr.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=junit,html'
            }
        }

        stage('Publish Reports') {
            steps {
                junit 'playwright-report/results.xml'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}