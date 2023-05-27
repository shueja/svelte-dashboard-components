// Copyright (c) FIRST and other WPILib contributors.
// Open Source Software; you can modify and/or share it under the terms of
// the WPILib BSD license file in the root directory of this project.

package frc.robot;

import edu.wpi.first.cameraserver.CameraServer;
import edu.wpi.first.math.geometry.Pose2d;
import edu.wpi.first.math.geometry.Rotation2d;
import edu.wpi.first.networktables.IntegerEntry;
import edu.wpi.first.networktables.IntegerTopic;
import edu.wpi.first.networktables.NetworkTableEntry;
import edu.wpi.first.networktables.NetworkTableInstance;
import edu.wpi.first.networktables.NetworkTableListener;
import edu.wpi.first.networktables.PubSubOptions;
import edu.wpi.first.wpilibj.DriverStation;
import edu.wpi.first.wpilibj.GenericHID;
import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.event.EventLoop;
import edu.wpi.first.wpilibj.smartdashboard.Field2d;
import edu.wpi.first.wpilibj.smartdashboard.SendableChooser;
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard;

/**
 * The VM is configured to automatically run this class, and to call the functions corresponding to
 * each mode, as described in the TimedRobot documentation. If you change the name of this class or
 * the package after creating this project, you must also update the build.gradle file in the
 * project.
 */
public class Robot extends TimedRobot {
  private static final String kDefaultAuto = "Default";
  private static final String kCustomAuto = "My Auto";
  private String m_autoSelected;
  private final SendableChooser<String> m_chooser = new SendableChooser<>();
  private long count = 0;
  private GenericHID input = new GenericHID(0);
  private IntegerTopic countTopic = NetworkTableInstance.getDefault().getIntegerTopic("SmartDashboard/count");
  private IntegerEntry countEntry = countTopic.getEntry(count);
  private EventLoop loop = new EventLoop();
  private Field2d field = new Field2d();

  /**
   * This function is run when the robot is first started up and should be used for any
   * initialization code.
   */
  @Override
  public void robotInit() {
    m_chooser.setDefaultOption("Default Auto", kDefaultAuto);
    m_chooser.addOption("My Auto", kCustomAuto);
    SmartDashboard.putData("Auto choices", m_chooser);
    input.button(1, loop).rising().ifHigh(()->{count++; countEntry.set(count);});

    input.button(2, loop).rising().ifHigh(()->SmartDashboard.putString("json", """
      {"tabs":[{"name":"drive","grid":{"rows":9,"columns":12},"elements":[{"name":"FMS Info","type":"fms-info","data":"SmartDashboard/count","layout":{"x":10,"y":1,"width":3,"height":2},"gyro":{"units":"radians"}},{"name":"Auto Chooser","type":"chooser","data":"/SmartDashboard/Auto choices","layout":{"x":1,"y":4,"width":4,"height":1}},{"name":"Wheel Velocities","type":"graph","data":["drive/leftVelocity","drive/rightVelocity"],"graph":{"limits":{"x":[0,10],"y":[-50,50]}},"layout":{"width":2,"height":2}},{"name":"Scoring Grid","type":"grid","data":"/DriverDisplay/selection","grid":{},"layout":{"width":9,"height":3,"x":1,"y":1}},{"name":"Match Time","type":"timer","data":"/SmartDashboard/matchTime","timer":{},"layout":{"width":3,"height":1,"x":10,"y":3}}]}]}
      """
    
    ));
    countEntry.set(count);
    SmartDashboard.putData(field);
    SmartDashboard.putNumber("matchTime", DriverStation.getMatchTime());
    CameraServer.startAutomaticCapture();
  }

  /**
   * This function is called every 20 ms, no matter the mode. Use this for items like diagnostics
   * that you want ran during disabled, autonomous, teleoperated and test.
   *
   * <p>This runs after the mode specific periodic functions, but before LiveWindow and
   * SmartDashboard integrated updating.
   */
  @Override
  public void robotPeriodic() {
    loop.poll();
    if (countEntry.get() != count) {
      count = countEntry.get();
    }
    field.getRobotObject().setPose(new Pose2d(count, 0, new Rotation2d()));
    SmartDashboard.putString("word", input.button(2, loop).getAsBoolean() ? "hi" : "bye");
    SmartDashboard.putBoolean("button", input.button(2, loop).getAsBoolean());
    SmartDashboard.putNumber("matchTime", DriverStation.getMatchTime());
  }

  /**
   * This autonomous (along with the chooser code above) shows how to select between different
   * autonomous modes using the dashboard. The sendable chooser code works with the Java
   * SmartDashboard. If you prefer the LabVIEW Dashboard, remove all of the chooser code and
   * uncomment the getString line to get the auto name from the text box below the Gyro
   *
   * <p>You can add additional auto modes by adding additional comparisons to the switch structure
   * below with additional strings. If using the SendableChooser make sure to add them to the
   * chooser code above as well.
   */
  @Override
  public void autonomousInit() {
    m_autoSelected = m_chooser.getSelected();
    // m_autoSelected = SmartDashboard.getString("Auto Selector", kDefaultAuto);
    System.out.println("Auto selected: " + m_autoSelected);
  }

  /** This function is called periodically during autonomous. */
  @Override
  public void autonomousPeriodic() {
    switch (m_autoSelected) {
      case kCustomAuto:
        // Put custom auto code here
        break;
      case kDefaultAuto:
      default:
        // Put default auto code here
        break;
    }
  }

  /** This function is called once when teleop is enabled. */
  @Override
  public void teleopInit() {}

  /** This function is called periodically during operator control. */
  @Override
  public void teleopPeriodic() {}

  /** This function is called once when the robot is disabled. */
  @Override
  public void disabledInit() {}

  /** This function is called periodically when disabled. */
  @Override
  public void disabledPeriodic() {}

  /** This function is called once when test mode is enabled. */
  @Override
  public void testInit() {}

  /** This function is called periodically during test mode. */
  @Override
  public void testPeriodic() {}

  /** This function is called once when the robot is first started up. */
  @Override
  public void simulationInit() {}

  /** This function is called periodically whilst in simulation. */
  @Override
  public void simulationPeriodic() {}
}
