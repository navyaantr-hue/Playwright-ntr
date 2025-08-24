pipeline {
    agent any

    tools {
        nodejs "NodeJS-18"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/navyaantr-hue/Playwright-ntr.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Generate both JUnit (for Jenkins) and HTML (for browser) reports
                sh 'npx playwright test --reporter=junit,test-results/results.xml --reporter=html,playwright-report'
            }
        }
    }

    post {
        always {
            // Archive JUnit reports for Jenkins UI
            junit 'test-results/*.xml'

            // Keep HTML reports as Jenkins build artifacts
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}