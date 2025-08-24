pipeline {
    agent any

    tools {
        nodejs "NodeJS-18"   // Set in Jenkins → Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/navyaantr-hue/Playwright-ntr.git'
            }
        }

        stage('Clean and Install') {
            steps {
                sh 'rm -rf node_modules'                  // Fresh install every time
                sh 'npm install'                          // Install project dependencies
                sh 'npx playwright install --with-deps'   // Install Playwright browsers
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=junit,html' // Generate both HTML & JUnit reports
            }
        }

        stage('Publish Reports') {
            steps {
                // Archive JUnit results
                junit 'playwright-report/results.xml'   // Matches our Playwright config below

                // Archive HTML report so it can be downloaded
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }
}