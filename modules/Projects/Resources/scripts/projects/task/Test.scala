package projects.task

import com.exponentus.appenv.AppEnv
import com.exponentus.scripting._Session
import com.exponentus.scriptprocessor.scala.ScalaAbstractServerTask
import com.exponentus.scriptprocessor.tasks.Command
import projects.init.ModuleConst


//run task prj_scala_test
@Command(name = ModuleConst.CODE + "_scala_test")
object Main extends ScalaAbstractServerTask {

  override def doTask(appEnv: AppEnv, session: _Session) =
    print("test");
}
