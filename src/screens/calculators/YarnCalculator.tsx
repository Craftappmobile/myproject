import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Input, Button } from '../../components/ui';

interface CalculationResult {
  yarnNeeded: number;
  ballsNeeded: number;
}

const YarnCalculator: React.FC = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [gauge, setGauge] = useState('');
  const [yarnWeight, setYarnWeight] = useState('');
  const [ballWeight, setBallWeight] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    
    if (!width || isNaN(Number(width)) || Number(width) <= 0) {
      newErrors.width = 'Введіть коректну ширину';
    }
    
    if (!height || isNaN(Number(height)) || Number(height) <= 0) {
      newErrors.height = 'Введіть коректну висоту';
    }
    
    if (!gauge || isNaN(Number(gauge)) || Number(gauge) <= 0) {
      newErrors.gauge = 'Введіть коректну щільність';
    }
    
    if (!yarnWeight || isNaN(Number(yarnWeight)) || Number(yarnWeight) <= 0) {
      newErrors.yarnWeight = 'Введіть коректну вагу пряжі на м²';
    }
    
    if (!ballWeight || isNaN(Number(ballWeight)) || Number(ballWeight) <= 0) {
      newErrors.ballWeight = 'Введіть коректну вагу мотка';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateYarnNeeded = () => {
    if (!validateInputs()) return;
    
    const widthValue = Number(width);
    const heightValue = Number(height);
    const gaugeValue = Number(gauge);
    const yarnWeightValue = Number(yarnWeight);
    const ballWeightValue = Number(ballWeight);
    
    // Розрахунок площі в м²
    const area = (widthValue * heightValue) / 10000; // переводимо см² в м²
    
    // Розрахунок кількості пряжі в грамах
    const yarnNeeded = area * yarnWeightValue * gaugeValue;
    
    // Розрахунок кількості мотків
    const ballsNeeded = Math.ceil(yarnNeeded / ballWeightValue);
    
    setResult({ yarnNeeded, ballsNeeded });
  };

  const resetCalculator = () => {
    setWidth('');
    setHeight('');
    setGauge('');
    setYarnWeight('');
    setBallWeight('');
    setResult(null);
    setErrors({});
  };

  return (
    <ScrollView style={styles.container}>
      <Card title="Калькулятор витрат пряжі">
        <View style={styles.inputContainer}>
          <Input
            label="Ширина виробу (см)"
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
            placeholder="Наприклад: 50"
            error={errors.width}
          />
          
          <Input
            label="Висота виробу (см)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="Наприклад: 60"
            error={errors.height}
          />
          
          <Input
            label="Щільність в'язання (коефіцієнт)"
            value={gauge}
            onChangeText={setGauge}
            keyboardType="numeric"
            placeholder="Наприклад: 1.2"
            error={errors.gauge}
          />
          
          <Input
            label="Вага пряжі на м² (г)"
            value={yarnWeight}
            onChangeText={setYarnWeight}
            keyboardType="numeric"
            placeholder="Наприклад: 200"
            error={errors.yarnWeight}
          />
          
          <Input
            label="Вага мотка пряжі (г)"
            value={ballWeight}
            onChangeText={setBallWeight}
            keyboardType="numeric"
            placeholder="Наприклад: 100"
            error={errors.ballWeight}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Розрахувати" 
            onPress={calculateYarnNeeded} 
            style={styles.button}
          />
          <Button 
            title="Скинути" 
            onPress={resetCalculator} 
            variant="outline"
            style={styles.button}
          />
        </View>
        
        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Результат розрахунку:</Text>
            <Text style={styles.resultText}>
              Необхідна кількість пряжі: {result.yarnNeeded.toFixed(2)} г
            </Text>
            <Text style={styles.resultText}>
              Кількість мотків: {result.ballsNeeded} шт.
            </Text>
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  resultContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  resultText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
});

export default YarnCalculator;